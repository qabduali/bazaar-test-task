import React, { useState } from 'react';
import { Button, Grid, CardMedia } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Image } from '../../consts/types';
import classes from './index.module.scss';

type Props = {
  images: Image[];
};

const AdCarousel: React.FC<Props> = ({ images }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item xs={12}>
        <CardMedia
          component="img"
          image={images[activeStep]?.image}
          alt={`Image ${activeStep}`}
          className={classes.image}
        />
      </Grid>
      <Grid item xs={12}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          <KeyboardArrowLeft />
          Back
        </Button>
        <Button
          disabled={activeStep === images.length - 1}
          onClick={handleNext}
        >
          Next
          <KeyboardArrowRight />
        </Button>
      </Grid>
    </Grid>
  );
};

export default AdCarousel;
