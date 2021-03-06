import React from 'react';
import { differenceInDays } from 'date-fns';
import { makeStyles, Typography } from '@material-ui/core';
import { Info } from '@material-ui/icons'

const useStyles = makeStyles({
  container: {
    margin: 10,
    display: 'flex',
    alignItems: 'center'
  },
})
const Trash: React.FC<{today: Date}> = ({ today }) => {
  const classes = useStyles()
  const referenceTime = new Date(2020, 2, 1) // 2020/3/1(Sun)
  const getTrash = (dayDiff: number) => {
    if (dayDiff % 14 === 0) {
      return 'ビン・カン'
    } else if (dayDiff % 14 === 3) {
      return 'プラ・衣類・布類・枝葉'
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
  const dayDiff = differenceInDays(today, referenceTime)
  const trash = getTrash(dayDiff)
  return (
    <div className={classes.container}>
      <Info fontSize='large' color='primary'/>
      {trash ? <Typography variant='h5'>明日は<strong>{trash}</strong>ゴミ収集日</Typography>
        : <Typography variant='h5'>明日はゴミ収集はありません</Typography>}
    </div>
  ) 
}

export default Trash;
