import React from 'react'
import Hero from '../components/Hero';
import RecentPosts from '../components/RecentPosts';
import FeaturePosts from '../components/FeaturePosts';

export default function Home() {
  return (
    <>
        <Hero/>
        <FeaturePosts/>
        <RecentPosts/>
    </>
  )
}
