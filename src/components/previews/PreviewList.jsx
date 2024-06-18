/* eslint-disable react/prop-types */
import React from 'react';

// Maps over array of podcasts show objects and creates a list. Uses PreviewItem component to create individual preview links.
import classes from './PreviewList.module.css';
import PreviewItem from './PreviewItem';

export default function PreviewList({ genre, previewListData }) {
  return (
    <>
      <div className={classes.previews}>
        <h1>{genre}</h1>
      </div>
      <div>
        <ul className={classes.list}>
          {previewListData.map((previewData) => (
            <PreviewItem key={previewData.id} previewData={previewData} />
          ))}
        </ul>
      </div>
    </>
  );
}
