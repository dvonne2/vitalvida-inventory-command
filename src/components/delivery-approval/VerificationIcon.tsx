
import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface VerificationIconProps {
  verified: boolean;
}

const VerificationIcon = ({ verified }: VerificationIconProps) => {
  return verified ? (
    <CheckCircle className="h-4 w-4 text-green-400" />
  ) : (
    <XCircle className="h-4 w-4 text-red-400" />
  );
};

export default VerificationIcon;
