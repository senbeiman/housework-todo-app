import React, { useState, useEffect } from 'react';
import { differenceInDays } from 'date-fns';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  trashName: {
    fontWeight: 'bold'
  }
})
const Trash: React.FC = () => {
  const classes = useStyles()
  const [trash, setTrash] = useState<string | null>(null);
  const referenceTime = new Date(2020, 2, 1) // 2020/3/1(Sun)
  const getTrash = (dayDiff: number) => {
    if (dayDiff % 14 === 0) {
      return 'ビン・カン'
    } else if (dayDiff % 14 === 3) {
      return 'プラ・衣類・布類'
    } else if (dayDiff % 14 === 7) {
      return 'ダンボール'
    } else if (dayDiff % 14 === 9) {
      return 'ペットボトル'
    } else if (dayDiff % 14 === 10) {
      return 'プラ・新聞紙・牛乳パック'
    } else if (dayDiff % 7 === 1 || dayDiff % 14 === 11) {
      return '可燃・おむつ'
    } else if (dayDiff % 14 === 4) {
      return '可燃・不燃・おむつ'
    } else if (dayDiff % 28 === 2) {
      return '本・雑誌・その他の紙'
    } else if (dayDiff % 28 === 16) {
      return '本・雑誌・その他の紙・有害'
    } else {
      return null
    }
  }
  useEffect(() => {
    const updateTrash = () => {
      const currentTime = new Date()
      const dayDiff = differenceInDays(currentTime, referenceTime)
      setTrash(getTrash(dayDiff))
    }
    updateTrash()
    const intervalId = setInterval(updateTrash, 1000 * 60)
    return () => {clearInterval(intervalId)}
  }, [trash])
  return <>{trash && <div>明日は<span className={classes.trashName}>{trash}</span>収集日</div>}</>
}

export default Trash;
