// /editMealItem/[id]/page.js
import EditMealItemComponent from '../../components/EditMealComponent';

export default function Page({ params }) {
  const { id } = params; // Access the dynamic route parameter 'id'

  // Render loading if 'id' is not available
  if (!id) return <div>Loading...</div>;

  return (
    <div>
      {/* Pass the id to EditMealItemComponent */}
      <EditMealItemComponent mealItemId={id} />
    </div>
  );
}