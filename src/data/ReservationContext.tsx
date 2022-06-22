import React, { createContext } from 'react';
import { Type } from 'typescript';
import { ReservationContextType } from './ReservationDataInterface';

/**
 * @return {React.Context}
 */
export const ReservationContext = createContext<ReservationContextType | null>(
  null,
);
