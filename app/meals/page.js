
import Link from 'next/link'
import classes from './page.module.css'
import MealsGrid from '@/components/meals/meals-grid'
import { getMeals } from '@/lib/meals'
import { Suspense } from 'react';


export const metadata = {
  title: 'All Meals',
  description: 'Exlpore all of the delicious meals shared by our food-loving community.',
};




async function Meals() {
  const meals = await getMeals();

  return <MealsGrid meals={meals} />

}


const page = () => {



  return (
    <>
      <header className={classes.header}>
        <h1>Delicious meals, created <span className={classes.highlight}>by you</span></h1>
        <p>Explore and experiment with different recipes that piques your interest!</p>
        <p className={classes.cta}>
          <Link href='/meals/share'>Share your favorite recipe!</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>
          Fetching meals...
        </p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  )
}

export default page