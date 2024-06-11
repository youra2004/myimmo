import React, { memo, ReactElement, useContext } from "react";
import { Text, Icon } from "galio-framework";
import { materialTheme } from "../../../constants";
import {
  qualityRates,
  conditionRates,
  RATING_REVIEW_SIZE,
  RATING_SIZE,
} from "../utils";
import {
  getConditionRatingIndex,
  getQualityRatingIndex,
  RATE_THE_CONDITION_TEXT,
  RATE_THE_QUALITY_TEXT,
} from "./utils";
import { AirbnbRating } from "react-native-ratings";
import { styles } from "../styles";
import { DossierTypes } from "../../../utils/constants";
import { RatingProps } from "./types";
import { View } from "react-native";
import { FormContext } from "../../../context/Form";

const defaultHandler = () => () => {};

const Rating = ({
  property,
  handleQualityRate = defaultHandler,
  handleConditionRate = defaultHandler,
  type,
  disabled = false,
}: RatingProps): ReactElement => {
  const formContext = useContext(FormContext);
  const dossierConfig = formContext.dossierConfig;

  const qualityRates = dossierConfig?.property.quality || [];
  const conditionRates = dossierConfig?.property.condition || [];

  return (
    <>
      {[DossierTypes.APARTMENT, DossierTypes.HOUSE].includes(type) && (
        <>
          {/* Kitchen       */}
          <View style={styles.formRatingsRow}>
            <View
              style={[styles.formRatingsColumn, styles.formRatingsColumnLeft]}
            >
              <Icon
                name="countertops"
                color={materialTheme.COLORS.ICON}
                family="MaterialIcons"
                size={20}
                style={styles.formRatingsLabelIcon}
              />
              <Text style={styles.ratingBlockTitle}>Kitchen: </Text>
            </View>
            <View
              style={[styles.formRatingsColumn, styles.formRatingsColumnRight]}
            >
              <AirbnbRating
                isDisabled={disabled}
                count={qualityRates.length}
                ratingContainerStyle={styles.ratingContainerStyle2}
                onFinishRating={handleQualityRate("property.quality.kitchen")}
                reviews={qualityRates.map(({ label }) => label)}
                defaultRating={getQualityRatingIndex(property.quality?.kitchen)}
                reviewSize={RATING_REVIEW_SIZE}
                size={RATING_SIZE}
                reviewColor={materialTheme.COLORS.BUTTON_COLOR}
                starContainerStyle={styles.formRatingsStarContainerStyle}
              />
              {!getQualityRatingIndex(property.quality?.kitchen) && (
                <Text style={styles.formRatingsDefaultText}>
                  {RATE_THE_QUALITY_TEXT}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.formRatingsRow}>
            <View
              style={[styles.formRatingsColumn, styles.formRatingsColumnLeft]}
            ></View>
            <View
              style={[styles.formRatingsColumn, styles.formRatingsColumnRight]}
            >
              <AirbnbRating
                isDisabled={disabled}
                count={conditionRates.length}
                ratingContainerStyle={styles.ratingContainerStyle2}
                onFinishRating={handleConditionRate(
                  "property.condition.kitchen"
                )}
                reviews={conditionRates.map(({ label }) => label)}
                defaultRating={getConditionRatingIndex(
                  property.condition?.kitchen
                )}
                reviewSize={RATING_REVIEW_SIZE}
                size={RATING_SIZE}
                reviewColor={materialTheme.COLORS.BUTTON_COLOR}
                starContainerStyle={styles.formRatingsStarContainerStyle}
              />
              {!getConditionRatingIndex(property.condition?.kitchen) && (
                <Text style={styles.formRatingsDefaultText}>
                  {RATE_THE_CONDITION_TEXT}
                </Text>
              )}
            </View>
          </View>
          {/* Bathrooms       */}
          <View style={styles.formRatingsRow}>
            <View
              style={[styles.formRatingsColumn, styles.formRatingsColumnLeft]}
            >
              <Icon
                name="hot-tub"
                color={materialTheme.COLORS.ICON}
                family="MaterialIcons"
                size={20}
                style={styles.formRatingsLabelIcon}
              />
              <Text style={styles.ratingBlockTitle}>Bathrooms: </Text>
            </View>
            <View
              style={[styles.formRatingsColumn, styles.formRatingsColumnRight]}
            >
              <AirbnbRating
                isDisabled={disabled}
                count={qualityRates.length}
                ratingContainerStyle={styles.ratingContainerStyle2}
                onFinishRating={handleQualityRate("property.quality.bathrooms")}
                reviews={qualityRates.map(({ label }) => label)}
                defaultRating={getQualityRatingIndex(
                  property.quality?.bathrooms
                )}
                reviewSize={RATING_REVIEW_SIZE}
                size={RATING_SIZE}
                reviewColor={materialTheme.COLORS.BUTTON_COLOR}
                starContainerStyle={styles.formRatingsStarContainerStyle}
              />
              {!getQualityRatingIndex(property.quality?.bathrooms) && (
                <Text style={styles.formRatingsDefaultText}>
                  {RATE_THE_QUALITY_TEXT}
                </Text>
              )}
            </View>
          </View>
          <View style={[styles.formRatingsRow]}>
            <View
              style={[styles.formRatingsColumn, styles.formRatingsColumnLeft]}
            ></View>
            <View
              style={[styles.formRatingsColumn, styles.formRatingsColumnRight]}
            >
              <AirbnbRating
                isDisabled={disabled}
                count={conditionRates.length}
                ratingContainerStyle={styles.ratingContainerStyle2}
                onFinishRating={handleConditionRate(
                  "property.condition.bathrooms"
                )}
                reviews={conditionRates.map(({ label }) => label)}
                defaultRating={getConditionRatingIndex(
                  property.condition?.bathrooms
                )}
                reviewSize={RATING_REVIEW_SIZE}
                size={RATING_SIZE}
                reviewColor={materialTheme.COLORS.BUTTON_COLOR}
                starContainerStyle={styles.formRatingsStarContainerStyle}
              />

              {!getConditionRatingIndex(property.condition?.bathrooms) && (
                <Text style={styles.formRatingsDefaultText}>
                  {RATE_THE_CONDITION_TEXT}
                </Text>
              )}
            </View>
          </View>
          {/* Floor       */}
          <View style={styles.formRatingsRow}>
            <View
              style={[styles.formRatingsColumn, styles.formRatingsColumnLeft]}
            >
              <Icon
                name="view-day"
                color={materialTheme.COLORS.ICON}
                family="MaterialIcons"
                size={20}
                style={styles.formRatingsLabelIcon}
              />
              <Text style={styles.ratingBlockTitle}>Floor: </Text>
            </View>
            <View
              style={[styles.formRatingsColumn, styles.formRatingsColumnRight]}
            >
              <AirbnbRating
                isDisabled={disabled}
                count={qualityRates.length}
                ratingContainerStyle={styles.ratingContainerStyle2}
                onFinishRating={handleQualityRate("property.quality.flooring")}
                reviews={qualityRates.map(({ label }) => label)}
                defaultRating={getQualityRatingIndex(
                  property.quality?.flooring
                )}
                reviewSize={RATING_REVIEW_SIZE}
                size={RATING_SIZE}
                reviewColor={materialTheme.COLORS.BUTTON_COLOR}
                starContainerStyle={styles.formRatingsStarContainerStyle}
              />
              {!getQualityRatingIndex(property.quality?.flooring) && (
                <Text style={styles.formRatingsDefaultText}>
                  {RATE_THE_QUALITY_TEXT}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.formRatingsRow}>
            <View
              style={[styles.formRatingsColumn, styles.formRatingsColumnLeft]}
            ></View>
            <View
              style={[styles.formRatingsColumn, styles.formRatingsColumnRight]}
            >
              <AirbnbRating
                isDisabled={disabled}
                count={conditionRates.length}
                ratingContainerStyle={styles.ratingContainerStyle2}
                onFinishRating={handleConditionRate(
                  "property.condition.flooring"
                )}
                reviews={conditionRates.map(({ label }) => label)}
                defaultRating={getConditionRatingIndex(
                  property.condition?.flooring
                )}
                reviewSize={RATING_REVIEW_SIZE}
                size={RATING_SIZE}
                reviewColor={materialTheme.COLORS.BUTTON_COLOR}
                starContainerStyle={styles.formRatingsStarContainerStyle}
              />
              {!getConditionRatingIndex(property.condition?.flooring) && (
                <Text style={styles.formRatingsDefaultText}>
                  {RATE_THE_CONDITION_TEXT}
                </Text>
              )}
            </View>
          </View>
          {/* Windows     */}
          <View style={styles.formRatingsRow}>
            <View
              style={[styles.formRatingsColumn, styles.formRatingsColumnLeft]}
            >
              <Icon
                name="web-asset"
                color={materialTheme.COLORS.ICON}
                family="MaterialIcons"
                size={20}
                style={styles.formRatingsLabelIcon}
              />
              <Text style={styles.ratingBlockTitle}>Windows: </Text>
            </View>
            <View
              style={[styles.formRatingsColumn, styles.formRatingsColumnRight]}
            >
              <AirbnbRating
                isDisabled={disabled}
                count={qualityRates.length}
                ratingContainerStyle={styles.ratingContainerStyle2}
                onFinishRating={handleQualityRate("property.quality.windows")}
                reviews={qualityRates.map(({ label }) => label)}
                defaultRating={getQualityRatingIndex(property.quality?.windows)}
                reviewSize={RATING_REVIEW_SIZE}
                size={RATING_SIZE}
                reviewColor={materialTheme.COLORS.BUTTON_COLOR}
                starContainerStyle={styles.formRatingsStarContainerStyle}
              />
              {!getQualityRatingIndex(property.quality?.windows) && (
                <Text style={styles.formRatingsDefaultText}>
                  {RATE_THE_QUALITY_TEXT}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.formRatingsRow}>
            <View
              style={[styles.formRatingsColumn, styles.formRatingsColumnLeft]}
            ></View>
            <View
              style={[styles.formRatingsColumn, styles.formRatingsColumnRight]}
            >
              <AirbnbRating
                isDisabled={disabled}
                count={conditionRates.length}
                ratingContainerStyle={styles.ratingContainerStyle2}
                onFinishRating={handleConditionRate(
                  "property.condition.windows"
                )}
                reviews={conditionRates.map(({ label }) => label)}
                defaultRating={getConditionRatingIndex(
                  property.condition?.windows
                )}
                reviewSize={RATING_REVIEW_SIZE}
                size={RATING_SIZE}
                reviewColor={materialTheme.COLORS.BUTTON_COLOR}
                starContainerStyle={styles.formRatingsStarContainerStyle}
              />
              {!getConditionRatingIndex(property.condition?.windows) && (
                <Text style={styles.formRatingsDefaultText}>
                  {RATE_THE_CONDITION_TEXT}
                </Text>
              )}
            </View>
          </View>
        </>
      )}
      {type === DossierTypes.HOUSE && (
        <>
          {/* Masonry       */}
          <View style={styles.formRatingsRow}>
            <View
              style={[styles.formRatingsColumn, styles.formRatingsColumnLeft]}
            >
              <Icon
                name="wb-shade"
                color={materialTheme.COLORS.ICON}
                family="MaterialIcons"
                size={20}
                style={styles.formRatingsLabelIcon}
              />
              <Text style={styles.ratingBlockTitle}>Masonry: </Text>
            </View>
            <View
              style={[styles.formRatingsColumn, styles.formRatingsColumnRight]}
            >
              <AirbnbRating
                isDisabled={disabled}
                count={qualityRates.length}
                ratingContainerStyle={styles.ratingContainerStyle2}
                onFinishRating={handleQualityRate("property.quality.masonry")}
                reviews={qualityRates.map(({ label }) => label)}
                defaultRating={getQualityRatingIndex(property.quality?.masonry)}
                reviewSize={RATING_REVIEW_SIZE}
                size={RATING_SIZE}
                reviewColor={materialTheme.COLORS.BUTTON_COLOR}
                starContainerStyle={styles.formRatingsStarContainerStyle}
              />
              {!getQualityRatingIndex(property.quality?.masonry) && (
                <Text style={styles.formRatingsDefaultText}>
                  {RATE_THE_QUALITY_TEXT}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.formRatingsRow}>
            <View
              style={[styles.formRatingsColumn, styles.formRatingsColumnLeft]}
            ></View>
            <View
              style={[styles.formRatingsColumn, styles.formRatingsColumnRight]}
            >
              <AirbnbRating
                isDisabled={disabled}
                count={conditionRates.length}
                ratingContainerStyle={styles.ratingContainerStyle2}
                onFinishRating={handleConditionRate(
                  "property.condition.masonry"
                )}
                reviews={conditionRates.map(({ label }) => label)}
                defaultRating={getConditionRatingIndex(
                  property.condition?.masonry
                )}
                reviewSize={RATING_REVIEW_SIZE}
                size={RATING_SIZE}
                reviewColor={materialTheme.COLORS.BUTTON_COLOR}
                starContainerStyle={styles.formRatingsStarContainerStyle}
              />
              {!getConditionRatingIndex(property.condition?.masonry) && (
                <Text style={styles.formRatingsDefaultText}>
                  {RATE_THE_CONDITION_TEXT}
                </Text>
              )}
            </View>
          </View>
        </>
      )}
      {type === DossierTypes.MULTI_FAMILY_HOUSE && (
        <>
          {/* Building       */}
          <View style={styles.formRatingsRow}>
            <View
              style={[styles.formRatingsColumn, styles.formRatingsColumnLeft]}
            >
              <Icon
                name="domain"
                color={materialTheme.COLORS.ICON}
                family="MaterialIcons"
                size={20}
                style={styles.formRatingsLabelIcon}
              />
              <Text style={styles.ratingBlockTitle}>Building: </Text>
            </View>
            <View
              style={[styles.formRatingsColumn, styles.formRatingsColumnRight]}
            >
              <AirbnbRating
                isDisabled={disabled}
                count={qualityRates.length}
                ratingContainerStyle={styles.ratingContainerStyle2}
                onFinishRating={handleQualityRate("property.quality.overall")}
                reviews={qualityRates.map(({ label }) => label)}
                defaultRating={getQualityRatingIndex(property.quality?.overall)}
                reviewSize={RATING_REVIEW_SIZE}
                size={RATING_SIZE}
                reviewColor={materialTheme.COLORS.BUTTON_COLOR}
                starContainerStyle={styles.formRatingsStarContainerStyle}
              />
              {!getQualityRatingIndex(property.quality?.overall) && (
                <Text style={styles.formRatingsDefaultText}>
                  {RATE_THE_QUALITY_TEXT}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.formRatingsRow}>
            <View
              style={[styles.formRatingsColumn, styles.formRatingsColumnLeft]}
            ></View>
            <View
              style={[styles.formRatingsColumn, styles.formRatingsColumnRight]}
            >
              <AirbnbRating
                isDisabled={disabled}
                count={conditionRates.length}
                ratingContainerStyle={styles.ratingContainerStyle2}
                onFinishRating={handleConditionRate(
                  "property.condition.overall"
                )}
                reviews={conditionRates.map(({ label }) => label)}
                defaultRating={getConditionRatingIndex(
                  property.condition?.overall
                )}
                reviewSize={RATING_REVIEW_SIZE}
                size={RATING_SIZE}
                reviewColor={materialTheme.COLORS.BUTTON_COLOR}
                starContainerStyle={styles.formRatingsStarContainerStyle}
              />

              {!getConditionRatingIndex(property.condition?.overall) && (
                <Text style={styles.formRatingsDefaultText}>
                  {RATE_THE_CONDITION_TEXT}
                </Text>
              )}
            </View>
          </View>
        </>
      )}
    </>
  );
};

export default memo(Rating);
