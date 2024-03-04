import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from 'next/link';
import { IAd } from '../../consts/types';
import classes from './index.module.scss';

interface AdCardProps {
  ad: IAd;
  liked: boolean;
  onLike: (ad: IAd) => void;
}

const AdCard: React.FC<AdCardProps> = ({ ad, liked, onLike }) => {
  const handleLikeClick = () => {
    onLike(ad);
  };

  return (
    <Card className={classes.adCard}>
      <CardMedia
        component="img"
        height="140"
        image={ad.images[0].thumbnail}
        alt={ad.title}
        className={classes.adCard__thumbnail}
      />
      <CardContent className={classes.adCard__content}>
        <div className={classes.adCard__secondary}>
          <Link href={`/list/${ad.id}`}>
            <Typography
              gutterBottom
              variant="h5"
              component="h5"
              className={classes.adCard__title}
            >
              {ad.title}
            </Typography>
          </Link>
          <Button
            variant="outlined"
            onClick={handleLikeClick}
            className={classes.adCard__like}
            size="small"
          >
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </Button>
        </div>
        <div className={classes.adCard__secondary}>
          <Typography variant="body2" color="text.secondary" fontSize={12}>
            {ad.city_name}, {ad.district_name}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontSize={12}>
            {ad.price}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdCard;
