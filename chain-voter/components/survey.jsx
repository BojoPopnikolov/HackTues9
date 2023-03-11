import { useState } from "react";
import Blockchain from "@/server/blockchain/blockchain";
import Block from "@/server/blockchain/block";
import Transaction from "@/server/blockchain/transaction";

const blockchain = new Blockchain();

function Survey() {
    const [users, setUsers] = useState([]);
    const [options, setOptions] = useState(["option1", "option2", "option3", "option4"]);
    const [selectedOption, setSelectedOption] = useState("");
    const [voted, setVoted] = useState(false);

    function handleOptionChange(event) {
        setSelectedOption(event.target.value);
    }

    function handleRegister(event){
        event.preventDefault();
        const name = event.target.elements.name.value;
        const id = Date.now();
        setUsers((prevUsers) => [...prevUsers, { id, name }]);
        blockchain.addBlock(new Block(Date.now().toString(), new Transaction("", id, "")));
        event.target.reset();
    }

    function handleVote(event){
        event.preventDefault();
        const userId = event.target.elements.userId.value;
        const user = users.find((u) => u.id === userId);
        const option = event.target.elements.option.value;
        const transaction = new Transaction(userId, "survey", option);
        blockchain.addBlock(new Block(Date.now().toString(), transaction));
        event.target.reset();
        setVoted(true);
        console.log(blockchain);
    }

    return (
        <div className="w-full text-2xl grid gap-2">
            <form onSubmit={handleRegister} className="border grid py-4 px-4">
                <div className="flex mb-4">
                    <label htmlFor="name">Name:</label>
                    <input type={"text"} id={"name"} required/>
                </div>
                <button type="submit" className="border w-max px-4 py-2">Register</button>
            </form>
            <form onSubmit={handleVote} className="border py-4 px-4">
                <select id="userId" required>
                    <option value="">Select user</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
                {options.map((option) => (
                    <div key={option} className="ml-4">
                        <input
                            type={"radio"}
                            name={"option"}
                            value={option}
                            checked={selectedOption === option}
                            onChange={handleOptionChange}
                            required
                        />
                        {option}
                    </div>
                ))}
                <button type="submit" className="border px-4 py-2 mt-4">Vote</button>
            </form>

            {voted && (
                <div>
                    {blockchain.chain.map((chain, index) => (
                        <>
                            <p>Block {index + 1}'s hash{chain.hash}</p>
                        </>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Survey;