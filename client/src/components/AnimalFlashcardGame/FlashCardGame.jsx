import FlashCard from "./FlashCard";

export default function FlashCardGame() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-black text-center">
        Flashcard Game
      </h1>
      <div className="grid md:grid-cols-4 gap-8">
        <FlashCard
          image={
            "https://images.unsplash.com/photo-1535068484622-7a077e5aa558?q=80&w=3435&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
        <FlashCard
          image={
            "https://images.unsplash.com/photo-1531959870249-9f9b729efcf4?q=80&w=3484&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
        <FlashCard
          image={
            "https://images.unsplash.com/photo-1511216113906-8f57bb83e776?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
        <FlashCard
          image={
            "https://images.unsplash.com/photo-1588167056547-c183313da47c?q=80&w=2282&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
      </div>
    </div>
  );
}
