import React from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import PreviewList from '../components/previews/PreviewList';

export default function Home() {
  const allShowsData = useRouteLoaderData('all-shows');

  return (
    <>
      <div>Recommended shows</div>
      <PreviewList genre="All" previewListData={allShowsData} />
    </>
  );
}
