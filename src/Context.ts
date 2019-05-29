import React from "react";
import { TableContextState, ExpanderContextState } from "./interface";

export const TableContext = React.createContext<TableContextState>(null);

export const ExpanderContext = React.createContext<ExpanderContextState>(null);