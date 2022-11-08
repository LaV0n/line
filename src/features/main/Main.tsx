import styles from './Main.module.scss'
import {Coin} from "./Coin/Coin";
import React, {useEffect, useRef, useState} from 'react';
import {AudioSource, playAudio} from "../../constants/AudioSource";
import arrow from '../../assets/image/right-arrow-svgrepo-com.svg'
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {resetInitialCoins} from "../../bll/gameReducer";
import background2 from '../../assets/image/background2.jpg'
import background3 from '../../assets/image/background3.jpg'
import {Button} from '@mui/material';

export const Main = () => {

    const dragItem: any = useRef();
    const dragDiv: any = useRef();
    const initialCoins = useAppSelector<any[]>(state => state.game.initialCoins)
    const numberOfItem = useAppSelector(state => state.game.numberOfItem)
    const [backgroundImage, setBackgroundImage] = useState(background3);
    const dispatch = useAppDispatch()
    const direction = useAppSelector(state => state.game.direction)
    const kindOfCoin = useAppSelector(state => state.game.kindOfCoin)
    const [coins, setCoins] = useState(initialCoins);
    const [panels, setPanels] = useState<number[] | string[]>([]);

    const dragStart = (e: any) => {
        dragItem.current = e.target.innerHTML;
        playAudio(AudioSource.coin)
    };

    const dragEnter = (e: any) => {
        dragDiv.current = e.target.id;
    };

    const drop = () => {
        let itemIndex: number | null = 0
        let conditionUp
        let conditionDown
        if (kindOfCoin !== 26) {
            itemIndex = coins.findIndex(f => f === +dragItem.current)
            conditionUp = (Math.min(...coins) === +dragItem.current) && (panels.length === 0 ? true : dragItem.current > panels[panels.length - 1])
            conditionDown = (Math.max(...coins) === +dragItem.current) && (panels.length === 0 ? true : dragItem.current < panels[panels.length - 1])
        } else {
            itemIndex = coins.findIndex(f => f === dragItem.current)
            conditionUp = (Math.min(...coins.map(c => c.charCodeAt(0) - 97)) === dragItem.current.charCodeAt(0) - 97) && (panels.length === 0 ? true : dragItem.current > panels[panels.length - 1])
            conditionDown = (Math.max(...coins.map(c => c.charCodeAt(0) - 97)) === dragItem.current.charCodeAt(0) - 97) && (panels.length === 0 ? true : dragItem.current < panels[panels.length - 1])
        }

        if (itemIndex !== -1 && dragDiv.current === 'panel' && (direction === 'up' ? conditionUp : conditionDown)) {
            let dragItemContent = coins[itemIndex];
            setCoins(coins.filter(u => u !== dragItemContent))
            setPanels([...panels, dragItemContent])
            itemIndex = null;
            playAudio(AudioSource.correct)
        } else {
            playAudio(AudioSource.error)
        }
    };

    const resetGame = () => {
        setPanels([])
        setCoins(initialCoins)
        dispatch(resetInitialCoins())
    }
    if (coins.length === 0) playAudio(AudioSource.win)

    useEffect(() => {
        setBackgroundImage(Math.random() < 0.5 ? background3 : background2)
    }, [])

    return (
        <div>
            <div className={styles.background} style={{backgroundImage: `url(${backgroundImage})`}}></div>
            {coins.length === 0 &&
                <div className={styles.winnerBlock}>
                    You Are Winner
                    <NavLink to={'/'} style={{textDecoration: 'none'}}>
                        <Button onClick={resetGame} variant="contained" color={'success'}>try again</Button>
                    </NavLink>
                </div>
            }
            <div className={styles.container}>
                <div className={styles.table} id='coins' onDragEnter={dragEnter}>
                    {coins.map(c =>
                        <Coin key={c} dragStart={dragStart} coin={c} drop={drop}/>
                    )}
                </div>
                {direction === 'up'
                    ? <div className={styles.direction}>
                        <span>Way Up</span>
                        <img src={arrow} className={styles.arrow} alt={'0'}/>
                    </div>
                    : <div className={styles.direction}>
                        <span>Way Down</span>
                        <img src={arrow} className={styles.arrow} alt={'0'} style={{transform: 'rotate(0.5turn)'}}/>
                    </div>
                }
                <div className={styles.panel} id='panel' onDragEnter={dragEnter}>
                    {panels.map((p) =>
                        <Coin coin={p} key={p}/>
                    )}
                </div>
                <div className={styles.panelWithHole}>
                    {[...Array(numberOfItem)].map(p => <div className={styles.hole} key={p}></div>)}
                </div>

            </div>
        </div>
    )
}

