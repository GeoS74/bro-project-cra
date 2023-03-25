import { createContext } from 'react';

export default createContext<{hook: React.Dispatch<React.SetStateAction<undefined>>} | undefined>(undefined)