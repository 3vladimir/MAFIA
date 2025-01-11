import { Player } from "@/types";

export type PropsForDialogEnterFirstDay = {
  openDialog: boolean;
  handleClickCloseDialog: () => void;
};

export type PropsForDialogExitGame = {
  openDialog: boolean;
  handleClickCloseDialog: () => void;
};

export type PropsForDialogPlayerOut = {
  openDialog: boolean;
  handleClickCloseDialog: () => void;
  playerOut: string;
};

export type PropsForDialogSeeRoles = {
  openDialog: boolean;
  setoOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  item: Player;
  areRolesDistributed: boolean;
};

export type PropsForDialogNightKeels = {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};
