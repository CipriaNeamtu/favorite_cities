import { Button } from "@/components/ui/button"
import { DialogType } from "../definitions"
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog"
import { Text } from "@chakra-ui/react"

const Dialog = ({ title, text, open, onOpenChange, onSave, placement }: DialogType) => {

  const handleAction = () => {
    if (onSave) {
      onSave();
    }
  }

	return (
		<DialogRoot lazyMount open={open} onOpenChange={onOpenChange} placement={placement ?? 'center'}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Text>
            {text}
          </Text>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button onClick={handleAction}>Save</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
	)
}

export default Dialog