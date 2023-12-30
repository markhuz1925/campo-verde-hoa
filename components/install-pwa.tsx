"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import { urbanist } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export default function InstallPwa() {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault();
      setDeferredPrompt(event);

      if (!window.matchMedia("(display-mode: standalone)").matches) {
        setOpenDrawer(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    setIsIOS(/iPhone|iPad|iPod/i.test(navigator.userAgent));

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const onInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          setDeferredPrompt(null);
          setOpenDrawer(false);
        }
      });
    }
  };

  return (
    <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
      <DrawerContent className={urbanist.className}>
        <DrawerHeader>
          <p className="text-xl font-semibold">
            Install CVHOA Management System
          </p>
        </DrawerHeader>
        <div className="pb-5 px-4">
          {isIOS ? (
            <p>{`AddTo install this app, tap on the Share icon and select "Add to Home Screen".`}</p>
          ) : (
            <p className="text-base font-normal">
              Click install button to install the app on your device.
            </p>
          )}
        </div>
        {!isIOS && (
          <DrawerFooter className="flex flex-row items-center justify-end gap-5">
            <DrawerClose asChild>
              <Button variant="secondary" size="sm">
                Cancel
              </Button>
            </DrawerClose>
            <Button onClick={onInstall} size="sm">
              Install
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
