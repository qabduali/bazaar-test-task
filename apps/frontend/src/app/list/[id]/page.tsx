'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import AdDetails from '../../components/ad-detail';
import { getAdById } from '../../requests/ads';
import classes from './styles.module.scss';

const AdDetailsPage = () => {
  const { id } = useParams();
  const [ad, setAd] = useState(null);

  useEffect(() => {
    if (id) {
      getAdById(+id)
        .then((res) => setAd(res))
        .catch(() => {
          toast.error('Error occured. Try again later.');
        });
    }
  }, [id]);

  return (
    <div className={classes.details__wrapper}>
      <h1 className={classes.details__title}>Ad Details Page</h1>
      {ad ? (
        <AdDetails ad={ad} isLiked={false} />
      ) : (
        <div className={classes.progress}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default AdDetailsPage;
