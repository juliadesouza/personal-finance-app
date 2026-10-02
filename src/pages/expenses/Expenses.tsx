import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table";
import { SearchIcon, MoreHorizontalIcon, FilterIcon } from "lucide-react";
import { useState } from "react";
import { AddExpense } from "@/components/expenses/AddExpense";

export default function Expenses() {
  const [showFilters, setShowFilters] = useState(false);
  const years = [
    { label: "2026", value: "2026" },
    { label: "2025", value: "2025" },
  ]
  const months = [
    { label: "January", value: "01" },
    { label: "February", value: "02" },
    { label: "March", value: "03" },
    { label: "April", value: "04" },
    { label: "May", value: "05" },
    { label: "June", value: "06" },
    { label: "July", value: "07" },
    { label: "August", value: "08" },
    { label: "September", value: "09" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ]

  const categories = [
    { label: "Food", value: "food" },
    { label: "Transportation", value: "transportation" },
    { label: "Housing", value: "housing" },
    { label: "Utilities", value: "utilities" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Other", value: "other" },
  ]

  const purposes = [
    { label: "extra", value: "food" },
    { label: "fixed", value: "transportation" },
  ]
   
 
  return (
    <section className="w-full">
        <header className="mb-8">
            <h1 className="text-2xl font-bold tracking-wide mb-0.5">Expenses</h1>
            <p className="text-sm text-muted-foreground">Track your daily expenses.</p>
        </header>
      <main>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 flex-1 mr-2">
          <form className="flex-1">
            <InputGroup>
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
          </form>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="cursor-pointer"><FilterIcon /> Filters</Button>
          </div>
          <AddExpense />
        </div>
        {showFilters && (
          
            <form className="flex items-center gap-2 mb-8">
            <Select items={years}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {years.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select items={months}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {months.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select items={categories}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select items={purposes}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {purposes.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            </form>
          
        )}
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
             {Array.from({ length: 10 }).map((_, index) => ( 
              <TableRow>
                <TableCell>Abib eye patches</TableCell>
                <TableCell>$10</TableCell>
                <TableCell>2026-09-29</TableCell>
                <TableCell>Skincare</TableCell>
                <TableCell>Extra</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell> <DropdownMenu>
                  <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="size-8"><MoreHorizontalIcon /><span className="sr-only">Open menu</span></Button>} />
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu></TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </section>
  );
}