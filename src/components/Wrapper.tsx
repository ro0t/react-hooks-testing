import * as React from 'react';

const TestElement: React.SFC = ({children}) => (
    <div style={{marginBottom: '25px', background: '#dbdbdb', padding: '20px'}}>{children}</div>
);

const Wrapper: React.SFC = ({props}) => {
    // Example of two different counters (re-using the counter state)
    const [count, setCount] = React.useState(0);
    const [count2, setCount2] = React.useState(0);

    // Toggle user object
    const [user, setUser] = React.useState({name: 'Adam', age: 27});
    const changeUser = () => {
        const currentYear = new Date().getFullYear();

        if (user.name == 'Adam') {
            setUser({name: 'Homer Simpson', age: (currentYear - 1979)});
        } else {
            setUser({name: 'Adam', age: (currentYear - 1991)});
        }
    };

    // Similar to componentDidMount and componentDidUpdate
    // Changes depending on which user is active
    React.useEffect(() => {
            const emoji = (user.name === 'Adam') ? '🐙' : '🤯';
            const counter = (user.name === 'Adam') ? count : count2;
            document.title = `${emoji} ${user.name} clix ${counter} times`;
        },
        // Subscribe to state changes
        // Only run this effect if the following objects change:
        [user, count, count2]
    );

    // The basic TODO list thing..
    const [missions, setMissions] = React.useState([{ task: 'Create another task!', done: false }]);
    const inputChanged = ev => {
        if (ev.key === 'Enter' && ev.target.value.length > 0) {
            const task = ev.target.value;

            // Does this work? 🤔
            // yes it does, no issue 'magad, no warning, no error, errybody happy! 🎉
            missions[0].done = true;

            // Add the new task and update values
            setMissions([...missions, { task, done: false }]);

            ev.target.value = '';
        }
    };
    const toggleTask = (task) => {
        const index = missions.indexOf(task);
        missions[index].done = !missions[index].done;

        // Save values to the state and trigger a re-render
        setMissions(missions);
    };

    return (
        <React.Fragment>
            <TestElement>
                <p>►► Adam clicked {count} times</p>
                <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
                <button onClick={() => setCount(0)}>Reset</button>
                <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>

                <p>►► Homer clicked {count2} times</p>
                <button onClick={() => setCount2(prevCount => prevCount - 1)}>-</button>
                <button onClick={() => setCount2(0)}>Reset</button>
                <button onClick={() => setCount2(prevCount => prevCount + 1)}>+</button>
            </TestElement>

            <TestElement>
                <p>Logged in as {user.name} - age: {user.age}</p>
                <p>Notice the document.title change :p</p>
                <button onClick={changeUser}>Change user</button>
            </TestElement>

            <TestElement>
                <div>
                    <h3>Add task</h3>
                    <p>Press 'enter' to create a task</p>
                    <input type="text" onKeyPress={e => inputChanged(e)}/>
                </div>
                <div>
                    <ul>
                        {missions.map((quest, index) => (
                            <li key={index}
                                style={{textDecoration: (quest.done) ? 'line-through' : 'none'}}
                                onClick={() => toggleTask(quest)}>
                                <input type="checkbox" checked={quest.done} onChange={() => true} /> {quest.task}
                            </li>
                        ))}
                    </ul>
                </div>
            </TestElement>


        </React.Fragment>
    );
}

export default Wrapper;