'use client';

import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import classes from './index.module.scss';
import { IAd } from './consts/types';
import { getAdsList } from './requests/ads';
import AdsList from './components/ad-list';

const Index: React.FC = () => {
  const [ads, setAds] = useState<IAd[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const firstRender = useRef<boolean>(true);

  const fetchAds = useCallback(async () => {
    setIsLoading(true);
    getAdsList()
      .then((res) => {
        setAds(res.results);
      })
      .catch((e) => {
        toast.error(e.message);
        setAds([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      fetchAds();
      firstRender.current = false;
    }
  }, [fetchAds]);

  return (
    <div className={classes.page}>
      <Box alignContent="center" className={classes.container}>
        {isLoading && (
          <div className={classes.circularProgress__container}>
            <CircularProgress />
          </div>
        )}
        {!isLoading && <AdsList ads={ads} setAds={setAds} />}
      </Box>
    </div>
  );
};

export default Index;
