"use client"

import { useState } from "react"
import Image from "next/image"
import { Shield, Printer, Check, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function PrintDialog({ open, onOpenChange, selectedJob }) {
  const [selectedPrinter, setSelectedPrinter] = useState("printer1")
  const [isPrinting, setIsPrinting] = useState(false)
  const [printProgress, setPrintProgress] = useState(0)

  const printers = [
    { id: "printer1", name: "HP LaserJet Pro", status: "Ready", type: "Laser" },
    { id: "printer2", name: "Epson WorkForce", status: "Ready", type: "Inkjet" },
    { id: "printer3", name: "Canon PIXMA", status: "Low Ink", type: "Inkjet" },
  ]

  const startPrinting = () => {
    setIsPrinting(true)

    // Simulate printing progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setPrintProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setIsPrinting(false)
          onOpenChange(false)
          setPrintProgress(0)
          // Here you would typically update the job status in your backend
        }, 500)
      }
    }, 200)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Print Document</DialogTitle>
          <DialogDescription>Select a printer and start printing the document</DialogDescription>
        </DialogHeader>

        {!isPrinting ? (
          <>
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4 p-4 border rounded-md bg-muted/30">
                <div className="relative h-12 w-12 overflow-hidden rounded bg-muted">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="Document preview"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 right-0 h-4 w-4 bg-primary/10 flex items-center justify-center rounded-tl">
                    <Shield className="h-2 w-2 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">{selectedJob?.name}</h3>
                  <div className="flex items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                      {selectedJob?.pages} pages, {selectedJob?.color ? "Color" : "B&W"}
                    </p>
                    <div className="flex items-center gap-1">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback>{selectedJob?.customer?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <p className="text-sm text-muted-foreground">{selectedJob?.customer}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Select Printer</h3>
                <div className="space-y-2">
                  {printers.map((printer) => (
                    <div
                      key={printer.id}
                      className={`flex items-center justify-between p-3 border rounded-md cursor-pointer transition-colors ${selectedPrinter === printer.id ? "border-primary bg-primary/5" : "hover:bg-muted"}`}
                      onClick={() => setSelectedPrinter(printer.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${selectedPrinter === printer.id ? "bg-primary/20" : "bg-muted"}`}
                        >
                          <Printer
                            className={`h-4 w-4 ${selectedPrinter === printer.id ? "text-primary" : "text-muted-foreground"}`}
                          />
                        </div>
                        <div>
                          <p className="font-medium">{printer.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {printer.type} • {printer.status}
                          </p>
                        </div>
                      </div>
                      {selectedPrinter === printer.id && <Check className="h-4 w-4 text-primary" />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                <span>Document will be decrypted only during printing</span>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={startPrinting} className="group">
                <Printer className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
                Start Printing
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="py-8 space-y-6">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Cpu className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium">Decrypting and printing document</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                The document is being decrypted and sent to the printer. This ensures the document remains secure until
                the moment of printing.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{printProgress}%</span>
              </div>
              <Progress value={printProgress} className="h-2" />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

