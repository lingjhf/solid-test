import './better-pull-refresh.css'

import BScroll from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'
import Pullup from '@better-scroll/pull-up'
import { createSignal, For, onMount } from 'solid-js'

BScroll.use(Pullup)
BScroll.use(PullDown)

function generateData() {
  const data: number[] = []
  for (let i = 0; i < 10; i++) {
    data.push(i)
  }
  return data
}

export default () => {
  let bsWrapper: HTMLDivElement | undefined

  const [rows, setRows] = createSignal<number[]>([])

  const TIME_BOUNCE = 800

  const [beforePullDown, setBeforePullDown] = createSignal(true)
  const [isPullingDown, setIsPullingDown] = createSignal(false)
  const [isPullUpload, setIsPullUpload] = createSignal(false)
  let bScroll: BScroll

  onMount(() => {
    if (bsWrapper) {
      initBScroll(bsWrapper)
    }
  })

  function initBScroll(el: HTMLDivElement) {
    bScroll = new BScroll(el, {
      scrollY: true,
      bounceTime: TIME_BOUNCE,
      useTransition: false,
      pullUpLoad: true,
      pullDownRefresh: {
        threshold: 70,
        stop: 56,
      },
    })
    bScroll.on('pullingDown', pullingDownHandler)
    bScroll.on('scrollEnd', (e: any) => {
      console.log('scrollEnd')
    })

    bScroll.on('pullingUp', pullingUpHandler)
  }

  async function pullingDownHandler() {
    console.log('trigger pullDown')
    setBeforePullDown(false)
    setIsPullingDown(true)

    await requestData()
    setIsPullingDown(false)
    finishPullDown()
  }

  async function pullingUpHandler() {
    console.log('trigger pullup')
    setIsPullUpload(true)

    await requestData()

    bScroll.finishPullUp()
    bScroll.refresh()
    setIsPullUpload(false)
  }

  async function finishPullDown() {
    bScroll.finishPullDown()
    setTimeout(() => {
      setBeforePullDown(true)
      bScroll.refresh()
    }, TIME_BOUNCE + 100)
  }

  async function requestData() {
    const data = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = generateData()
        resolve(data)
      }, 1000)
    })
    setRows(value => [...value, ...data])
    console.log(data)
  }
  return (
    <div class="pulldown">
      <div
        class="pulldown-bswrapper"
        ref={bsWrapper}
      >
        <div class="pulldown-scroller">
          <div class="pulldown-wrapper">
            <div>
              <span>下拉刷新</span>
            </div>
            <div v-show="!beforePullDown">
              <div v-show="isPullingDown">
                <span>加载中...</span>
              </div>
              <div v-show="!isPullingDown">
                <span>刷新完成</span>
              </div>
            </div>
          </div>
          <ul class="pulldown-list">
            <For each={rows()}>
              {item => <li>{item}</li>}
            </For>
          </ul>
          <div class="pullup-tips">
            <div v-if="!isPullUpLoad" class="before-trigger">
              <span class="pullup-txt">Pull up and load more</span>
            </div>
            <div v-else class="after-trigger">
              <span class="pullup-txt">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
