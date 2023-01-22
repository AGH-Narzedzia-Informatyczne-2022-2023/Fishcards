import { trpc } from "../utils/trpc";

export function BestCard({ id } : any) {
    
    const randomCard = trpc.card.getRandom.useQuery({ deckId: id });

    return (
    <>
        <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
            <h2 className="card-title mb-4"> { randomCard.data?.question ? randomCard.data.question : null } </h2>
            
            <div className="card-actions justify-center">
            <button className="btn btn-primary w-24">Very Easy</button>
            <button className="btn btn-primary w-24">Easy</button>
            <button className="btn btn-primary w-24">Medium</button>
            <button className="btn btn-primary w-24">Hard</button>
            <button className="btn btn-primary w-24">Very Hard</button>
            </div>
        </div>
        </div>
        
        <div className="collapse">
        <input type="checkbox" /> 
        <div className="collapse-title text-xl font-medium">
            Show answer
        </div>
        <div className="collapse-content"> 
            
        <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
            <h2 className="card-title mb-4"> { randomCard.data?.answer ? randomCard.data.answer : null } </h2>
        </div>
        </div>

        </div>
        </div>

    </>
    );
}