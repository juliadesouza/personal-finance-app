import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Field, FieldGroup } from "@/components/ui/field"
import { PlusIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export function AddExpense() {
  return (
    <Dialog>
      <form>
        <DialogTrigger render={<Button><PlusIcon/> Add Expense</Button>} />
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium">New expense</DialogTitle>
            <DialogDescription>
              Fill in the details of the expense to add it to your records.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Ex: restaurant" />
            </Field>
            <div className="flex items-center gap-2">
            <Field>
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" name="amount" placeholder="0.00" type="number" />
            </Field>
            <Field>
              <Label htmlFor="amount">Date</Label>
              <Input id="date" name="date" type="date" />
            </Field>
            </div>
            <Field>
              <Label htmlFor="amount">Payment Method</Label>
              <Select id="paymentMethod" name="paymentMethod">
                <SelectTrigger className="flex-1">
                  <SelectValue  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <div className="flex items-center gap-2">
            <Field>
              <Label htmlFor="category">Category</Label>
              <Select id="paymentMethod" name="paymentMethod">
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="transportation">Transportation</SelectItem>
                  <SelectItem value="housing">Housing</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <Label htmlFor="purpose">Purpose</Label>
              <Select id="purpose" name="purpose">
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="extra">Extra</SelectItem>
                  <SelectItem value="fixed">Fixed</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            </div>
          </FieldGroup>
          <DialogFooter className="flex items-center justify-between gap-2">
            <DialogClose render={<Button variant="outline" className="cursor-pointer flex-1">Cancel</Button>} />
            <Button type="submit" className="cursor-pointer flex-1">Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
