"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

const DialogState = React.createContext(false);

function Dialog({
  open,
  defaultOpen = false,
  onOpenChange,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isOpen = open ?? internalOpen;
  return (
    <DialogState.Provider value={isOpen}>
      <DialogPrimitive.Root
        data-slot="dialog"
        {...props}
        open={isOpen}
        onOpenChange={(nextOpen) => {
          setInternalOpen(nextOpen);
          onOpenChange?.(nextOpen);
        }}
      />
    </DialogState.Provider>
  );
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  const reduced = useReducedMotion();
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      {...props}
      forceMount
      asChild
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduced ? 0 : 0.16 }}
        className={cn(
          "fixed inset-0 z-50 bg-black/35 dark:bg-black/60",
          className,
        )}
      />
    </DialogPrimitive.Overlay>
  );
}

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  const open = React.useContext(DialogState);
  const reduced = useReducedMotion();
  return (
    <DialogPortal data-slot="dialog-portal" forceMount>
      <AnimatePresence>
        {open && <DialogOverlay key="overlay" />}
        {open && (
          <DialogPrimitive.Content
            key="content"
            data-slot="dialog-content"
            {...props}
            forceMount
            asChild
          >
            <motion.div
              initial={{
                opacity: 0,
                y: reduced ? 0 : 8,
                scale: reduced ? 1 : 0.985,
              }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                y: reduced ? 0 : 4,
                scale: reduced ? 1 : 0.99,
              }}
              transition={{
                duration: reduced ? 0 : 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                "bg-background fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 sm:max-w-lg",
                className,
              )}
            >
              {children}
              <DialogPrimitive.Close className="border-ink/15 bg-background text-foreground hover:bg-accent focus-visible:outline-ring absolute top-3 right-3 flex h-11 w-11 items-center justify-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4">
                <XIcon />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            </motion.div>
          </DialogPrimitive.Content>
        )}
      </AnimatePresence>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
