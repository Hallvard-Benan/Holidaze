import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "./alert-dialog";
import Spinner from "./spinner";

export default function AreYouSure({
  buttonText,
  title,
  onCancel,
  confirmText,
  status,
  onConfirm,
  description,
  confirmVariant,
  cancelText,
  className,
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className={className}>
        {buttonText}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel {...(onCancel ? { onClick: onCancel } : {})}>
            {cancelText ? cancelText : "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} variant={confirmVariant}>
            {status === "pending" ? (
              <Spinner></Spinner>
            ) : confirmText ? (
              confirmText
            ) : (
              "Continue"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
