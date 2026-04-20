import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useTranslation } from 'react-i18next';

interface FilterValues {
  identificacion: string;
  nombre: string;
}

interface ClientFiltersProps {
  onSearch: (filters: FilterValues) => void;
  onClear: () => void;
  loading: boolean;
  filters: FilterValues;
}

export default function ClientFilters({ onSearch, onClear, loading, filters: propFilters }: ClientFiltersProps) {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<FilterValues>({ ...propFilters });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleClear = () => {
    const empty = { identificacion: '', nombre: '' };
    setFilters(empty);
    onClear();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4} md={4}>
          <TextField
            name="identificacion"
            label={t('clients.filter_id')}
            value={filters.identificacion}
            onChange={handleChange}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <TextField
            name="nombre"
            label={t('clients.filter_name')}
            value={filters.nombre}
            onChange={handleChange}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={2} md={2}>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={<SearchRoundedIcon />}
            sx={{ height: 40, width: { xs: '100%', sm: '100%' } }}
          >
            {t('common.search')}
          </Button>
        </Grid>
        <Grid item xs={12} sm={2} md={2}>
          <Button
            type="button"
            variant="outlined"
            disabled={loading}
            startIcon={<ClearRoundedIcon />}
            onClick={handleClear}
            sx={{ height: 40, width: { xs: '100%', sm: '100%' } }}
          >
            {t('common.clear')}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
