import styles from './Main.module.scss'
import {Coin} from "./Coin/Coin";
import React, {useRef, useState} from 'react';
import {AudioSource} from "../../constants/AudioSource";
import arrow from '../../assets/image/right-arrow-svgrepo-com.svg'
import {NavLink} from "react-router-dom";


export const Main = () => {

    const dragItem: any = useRef();
    const dragDiv: any = useRef();
    const initialCoins=[10, 20, 30, 40]

    const [coins, setCoins] = useState(initialCoins);
    const [panels, setPanels] = useState<number[]>([]);

    const playAudio=(url:string)=>{
        new Audio(url).play()
    }

    const dragStart = (e: any) => {
        dragItem.current = e.target.innerHTML;
        console.log(e.target.innerHTML);
        playAudio(AudioSource.coin)
    };

    const dragEnter = (e: any) => {
        dragDiv.current = e.target.id;
        console.log(e.target.id);
    };

    const drop = () => {

        let itemIndex: number | null = coins.findIndex(f => f === +dragItem.current)

        const condition= ( (panels.length===0 && (Math.min(...coins)===+dragItem.current)) ? true : dragItem.current>panels[panels.length-1] )

        if (itemIndex !== -1 && dragDiv.current === 'panel'  && condition &&  (Math.min(...coins)===+dragItem.current) ){
            let dragItemContent = coins[itemIndex];
            setCoins(coins.filter(u => u !== dragItemContent))
            setPanels([...panels, dragItemContent])
            itemIndex = null;
        }

    };

    const resetGame=()=>{
        setPanels([])
        setCoins(initialCoins)
    }
    if(coins.length===0) playAudio(AudioSource.win)

    return (
        <div>
            <div className={styles.background}></div>
            {coins.length===0 &&
                <div className={styles.winnerBlock}>
                    You Are Winner
                    <NavLink to={'/'}>
                        <button onClick={resetGame}>try again</button>
                    </NavLink>
                </div>
            }
            <div className={styles.container}>
                <div className={styles.table} id='coins' onDragEnter={dragEnter}>
                    {coins.map(c=>
                        <Coin  key={c} dragStart={dragStart} coin={c} drop={drop}/>
                    )}
                </div>
                <div className={styles.direction}>
                    Way Up
                    <img src={arrow} className={styles.arrow} alt={'0'}/>
                </div>
                <div className={styles.panel} id='panel' onDragEnter={dragEnter} >
                    {panels.map((p)=>
                       <Coin coin={p} key={p}/>
                    )}
                </div>
            </div>
        </div>
    )
}

