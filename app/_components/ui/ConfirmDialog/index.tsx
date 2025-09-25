import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { Button } from "../Button";

type ConfirmDialogType = {
  title?: string;
  description?: string;
  open?: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
};

function ConfirmDialog({ title, description, handleClose, handleConfirm, open }: ConfirmDialogType) {
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>

          <div className="!mt-4 flex justify-end gap-4">
            <Button onClick={handleClose} variant="outline">
              Cancelar
            </Button>
            <Button onClick={handleConfirm}>Confirmar</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmDialog;
