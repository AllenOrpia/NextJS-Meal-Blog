
import Image from 'next/image'
import classes from './page.module.css'
import { getMeal } from '@/lib/meals.js'
import { notFound } from 'next/navigation'


export async function generateMetadata({ params }) {
  const meal = getMeal(params.slug)
  if (!meal) {
    // ! Calling this function will stop the rest of the component from executing and call the closes not-found page
    notFound();
  }
  return {
    title: meal.title,
    description: meal.summary
  }
}


const MealDetailsPage = ({ params }) => {

  const meal = getMeal(params.slug);


  meal.instructions = meal.instructions.replace(/\n/g, '<br />')


  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto: ${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p className={classes.instructions} dangerouslySetInnerHTML={{
          __html: meal.instructions
        }}></p>
      </main>

    </>
  )
}

export default MealDetailsPage