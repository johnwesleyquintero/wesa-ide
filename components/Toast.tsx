
import React, { useEffect } from 'react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

const CheckIcon = () => (
    <svg className="w-6 h-6 text-green-400" fill