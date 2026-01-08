"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/Input";
import { Button } from "@/app/_components/ui/Button";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { LuCheck, LuEye, LuEyeOff, LuX } from "react-icons/lu";
import { LucideAlertCircle } from "lucide-react";
import { useUpdateUserPassword } from "@/app/_hooks/user";

type UserModalType = {
  handleClose(): void;
};

function ChangePasswordModal({ handleClose }: UserModalType) {
  const { mutateAsync: updatePassword } = useUpdateUserPassword();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [touched, setTouched] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Calcula a força da senha
  const calculatePasswordStrength = (
    password: string
  ): { label: string; color: string; width: string; score: number } => {
    if (!password) return { score: 0, label: "", color: "", width: "0%" };

    let score = 0;

    // Critérios de força
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    const strength = {
      0: { label: "", color: "", width: "0%" },
      1: { label: "Muito Fraca", color: "bg-red-500", width: "20%" },
      2: { label: "Fraca", color: "bg-orange-500", width: "40%" },
      3: { label: "Média", color: "bg-yellow-500", width: "60%" },
      4: { label: "Forte", color: "bg-blue-500", width: "80%" },
      5: { label: "Muito Forte", color: "bg-green-500", width: "100%" },
    } as any;

    return { score, ...strength[score] };
  };

  const passwordStrength = calculatePasswordStrength(formData.newPassword);
  // Validações
  const validations = {
    minLength: formData.newPassword.length >= 8,
    hasUpperCase: /[A-Z]/.test(formData.newPassword),
    hasLowerCase: /[a-z]/.test(formData.newPassword),
    hasNumber: /\d/.test(formData.newPassword),
    hasSpecial: /[^a-zA-Z0-9]/.test(formData.newPassword),
    passwordsMatch: formData.newPassword === formData.confirmPassword && formData.confirmPassword !== "",
    isDifferent: formData.newPassword !== formData.currentPassword && formData.newPassword !== "",
  };

  const isFormValid =
    formData.currentPassword &&
    validations.minLength &&
    validations.hasUpperCase &&
    validations.hasLowerCase &&
    validations.hasNumber &&
    validations.passwordsMatch &&
    validations.isDifferent;

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const togglePasswordVisibility = (field: string) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !(prev as any)[field] }));
  };

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setIsSubmitting(true);

    try {
      const result = await updatePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });

      console.log("Password updated successfully:", result);

      setIsSubmitting(false);
      setSubmitSuccess(true);

      enqueueSnackbar("Senha alterada com sucesso!", { variant: "success" });

      // Reset após 3 segundos
      setTimeout(() => {
        setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setTouched({ currentPassword: false, newPassword: false, confirmPassword: false });
      }, 3000);

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 10000);
    } catch (error: any) {
      console.log("Erro o tentar alterar sua senha, verifique seus dados e tente novamwnte.", error);
      setIsSubmitting(false);
      enqueueSnackbar("Erro o tentar alterar sua senha, verifique seus dados e tente novamwnte.", { variant: "error" });
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && isFormValid) {
      handleSubmit();
    }
  };

  const ValidationItem = ({ isValid, text }: { isValid: boolean; text: string }) => (
    <div className={`flex items-center gap-2 text-sm ${isValid ? "text-green-600" : "text-gray-500"}`}>
      {isValid ? <LuCheck size={16} /> : <LuX size={16} />}
      <span>{text}</span>
    </div>
  );

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className="max-w-screen-[350px] max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Alterar sea senha</DialogTitle>
          <DialogDescription>Mantenha sua conta segura com uma senha forte.</DialogDescription>
        </DialogHeader>

        {submitSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
            <LuCheck className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-green-800 font-medium">Senha alterada com sucesso!</p>
              <p className="text-green-700 text-sm mt-1">Sua senha foi atualizada.</p>
            </div>
          </div>
        )}

        <div className="space-y-5">
          {/* Senha Atual */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Senha Atual *</label>
            <div className="relative">
              <Input
                type={showPasswords.current ? "text" : "password"}
                value={formData.currentPassword}
                onChange={(e) => handleChange("currentPassword", e.target.value)}
                onBlur={() => handleBlur("currentPassword")}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-6"
                placeholder="Digite sua senha atual"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("current")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPasswords.current ? <LuEyeOff size={20} /> : <LuEye size={20} />}
              </button>
            </div>
          </div>

          {/* Nova Senha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nova Senha *</label>
            <div className="relative">
              <Input
                type={showPasswords.new ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) => handleChange("newPassword", e.target.value)}
                onBlur={() => handleBlur("newPassword")}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-6"
                placeholder="Digite sua nova senha"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPasswords.new ? <LuEyeOff size={20} /> : <LuEye size={20} />}
              </button>
            </div>

            {/* Indicador de Força */}
            {formData.newPassword && (
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Força da senha:</span>
                  <span
                    className={`text-xs font-medium ${
                      passwordStrength.score <= 2
                        ? "text-red-600"
                        : passwordStrength.score === 3
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {passwordStrength.label}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                    style={{ width: passwordStrength.width }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Confirmar Nova Senha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Nova Senha *</label>
            <div className="relative">
              <Input
                type={showPasswords.confirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                onBlur={() => handleBlur("confirmPassword")}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-6"
                placeholder="Confirme sua nova senha"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPasswords.confirm ? <LuEyeOff size={20} /> : <LuEye size={20} />}
              </button>
            </div>
            {touched.confirmPassword && formData.confirmPassword && !validations.passwordsMatch && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <LucideAlertCircle size={14} />
                As senhas não coincidem
              </p>
            )}
          </div>

          {/* Requisitos da Senha */}
          {formData.newPassword && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium text-gray-700 mb-3">Requisitos da senha:</p>
              <ValidationItem isValid={validations.minLength} text="Mínimo de 8 caracteres" />
              <ValidationItem isValid={validations.hasUpperCase} text="Letra maiúscula" />
              <ValidationItem isValid={validations.hasLowerCase} text="Letra minúscula" />
              <ValidationItem isValid={validations.hasNumber} text="Número" />
              <ValidationItem isValid={validations.hasSpecial} text="Caractere especial (@, #, $, etc)" />
              <ValidationItem isValid={validations.isDifferent} text="Diferente da senha atual" />
            </div>
          )}

          {/* Botão Submit */}
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className="w-full"
            size={"lg"}
            variant="secondary"
          >
            {isSubmitting ? "Alterando..." : "Alterar Senha"}
          </Button>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">Sua senha será atualizada imediatamente</p>
      </DialogContent>
    </Dialog>
  );
}

export default ChangePasswordModal;
