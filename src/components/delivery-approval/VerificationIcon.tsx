
import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface VerificationIconProps {
  verified: boolean;
}

const VerificationIcon = ({ verified }: VerificationIconProps) => {
  return verified ? (
    <CheckCircle className="h-4 w-4 text-success" />
  ) : (
    <XCircle className="h-4 w-4 text-destructive" />
  );
};

export default VerificationIcon;
