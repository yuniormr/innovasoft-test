import React, { useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

interface ClientImageUploadProps {
  value: string | null;
  onChange: (base64: string | null) => void;
  disabled?: boolean;
}

export default function ClientImageUpload({ value, onChange, disabled }: ClientImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') onChange(reader.result);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <Avatar
        src={value || undefined}
        sx={{ width: 88, height: 88, bgcolor: 'primary.light' }}
      >
        {!value && <PersonRoundedIcon sx={{ fontSize: 44 }} />}
      </Avatar>
      {!disabled && (
        <>
          <Tooltip title="Cambiar imagen">
            <IconButton
              size="small"
              onClick={() => inputRef.current?.click()}
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                bgcolor: '#92400E',
                color: '#fff',
                '&:hover': { bgcolor: '#7C2D12' },
                width: 28,
                height: 28,
              }}
            >
              <CameraAltRoundedIcon sx={{ fontSize: '0.9rem' }} />
            </IconButton>
          </Tooltip>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </>
      )}
    </Box>
  );
}
