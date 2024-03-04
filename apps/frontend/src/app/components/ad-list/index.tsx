import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from '@mui/material';
import { getAdsList } from '../../requests/ads';
import AdCard from '../ad-card';
import { AdsFilterParams, IAd } from '../../consts/types';
import classes from './index.module.scss';

type Props = {
  ads: IAd[];
  setAds: React.Dispatch<React.SetStateAction<IAd[]>>;
};

const AdsList: React.FC<Props> = ({ ads, setAds }) => {
  const [openFilters, setOpenFilters] = useState(false);
  const [likedAds, setLikedAds] = useState<IAd[]>([]);
  const [filters, setFilters] = useState<AdsFilterParams>({
    minPrice: '',
    maxPrice: '',
    city: '',
    district: '',
    search: '',
  });

  const filterAds = async () => {
    const filteredFilters = Object.fromEntries(
      Object.entries(filters).filter(([, value]) => value !== '')
    );
    const filteredAds = await getAdsList(filteredFilters);
    setAds(filteredAds.results);
  };

  const handleFilterOpen = () => {
    setOpenFilters(true);
  };

  const handleFilterClose = () => {
    setOpenFilters(false);
  };

  const handleFilterApply = () => {
    setFilters({ ...filters });
    setOpenFilters(false);
    filterAds();
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleLikeAd = (ad: IAd) => {
    const isAlreadyLiked = likedAds.some((likedAd) => likedAd.id === ad.id);

    if (!isAlreadyLiked) {
      setLikedAds((prev) => [...prev, ad]);
    } else {
      setLikedAds((prev) => prev.filter((item) => item.id !== ad.id));
    }
  };

  return (
    <div className={classes.adList__wrapper}>
      <div className={classes.adList__header}>
        <h1 className={classes.adList__title}>List of ads</h1>
        <Button
          onClick={handleFilterOpen}
          variant="outlined"
          className={classes.adList__button}
        >
          Filters
        </Button>
      </div>
      <div className={classes.adList}>
        {ads.map((ad) => (
          <AdCard
            key={ad.id}
            ad={ad}
            liked={likedAds.some((item) => item.id === ad.id)}
            onLike={handleLikeAd}
          />
        ))}
      </div>
      <Dialog open={openFilters} onClose={handleFilterClose}>
        <div className={classes.filters__wrapper}>
          <DialogTitle>Filters</DialogTitle>
          <DialogContent className={classes.filters}>
            <TextField
              label="Min Price"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              className={classes.filters__textField}
            />
            <TextField
              label="Max Price"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className={classes.filters__textField}
            />
            <TextField
              label="City"
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              className={classes.filters__textField}
            />
            <TextField
              label="District"
              name="district"
              value={filters.district}
              onChange={handleFilterChange}
              className={classes.filters__textField}
            />
            <TextField
              label="Search"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              className={classes.filters__textField}
            />
          </DialogContent>
          <Button
            onClick={handleFilterApply}
            variant="contained"
            className={classes.filters__button}
            size="large"
          >
            Apply
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default AdsList;
