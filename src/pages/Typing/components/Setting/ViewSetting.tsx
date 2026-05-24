import styles from './index.module.css'
import { verifySettingPassword } from './verifySettingPassword'
import { defaultFontSizeConfig } from '@/constants'
import { fontSizeConfigAtom } from '@/store'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import * as Slider from '@radix-ui/react-slider'
import { useAtom } from 'jotai'
import { useCallback, useEffect, useState } from 'react'

export default function ViewSetting() {
  const [fontSizeConfig, setFontsizeConfig] = useAtom(fontSizeConfigAtom)
  const [foreignFontSize, setForeignFontSize] = useState(fontSizeConfig.foreignFont)
  const [translateFontSize, setTranslateFontSize] = useState(fontSizeConfig.translateFont)

  useEffect(() => {
    setForeignFontSize(fontSizeConfig.foreignFont)
    setTranslateFontSize(fontSizeConfig.translateFont)
  }, [fontSizeConfig.foreignFont, fontSizeConfig.translateFont])

  const onChangeForeignFontSize = useCallback((value: [number]) => {
    setForeignFontSize(value[0])
  }, [])

  const onCommitForeignFontSize = useCallback(
    async (value: [number]) => {
      if (value[0] === fontSizeConfig.foreignFont) return

      if (!(await verifySettingPassword())) {
        setForeignFontSize(fontSizeConfig.foreignFont)
        return
      }

      setFontsizeConfig((prev) => ({
        ...prev,
        foreignFont: value[0],
      }))
    },
    [fontSizeConfig.foreignFont, setFontsizeConfig],
  )

  const onChangeTranslateFontSize = useCallback((value: [number]) => {
    setTranslateFontSize(value[0])
  }, [])

  const onCommitTranslateFontSize = useCallback(
    async (value: [number]) => {
      if (value[0] === fontSizeConfig.translateFont) return

      if (!(await verifySettingPassword())) {
        setTranslateFontSize(fontSizeConfig.translateFont)
        return
      }

      setFontsizeConfig((prev) => ({
        ...prev,
        translateFont: value[0],
      }))
    },
    [fontSizeConfig.translateFont, setFontsizeConfig],
  )

  const onResetFontSize = useCallback(async () => {
    if (!(await verifySettingPassword())) return

    setFontsizeConfig({ ...defaultFontSizeConfig })
  }, [setFontsizeConfig])

  return (
    <ScrollArea.Root className="flex-1 select-none overflow-y-auto ">
      <ScrollArea.Viewport className="h-full w-full px-3">
        <div className={styles.tabContent}>
          <div className={styles.section}>
            <span className={styles.sectionLabel}>字体设置</span>
            <div className={styles.block}>
              <span className={styles.blockLabel}>外语字体</span>
              <div className="flex h-5 w-full items-center justify-between">
                <Slider.Root
                  value={[foreignFontSize]}
                  min={20}
                  max={96}
                  step={4}
                  className="slider"
                  onValueChange={onChangeForeignFontSize}
                  onValueCommit={onCommitForeignFontSize}
                >
                  <Slider.Track>
                    <Slider.Range />
                  </Slider.Track>
                  <Slider.Thumb />
                </Slider.Root>
                <span className="ml-4 w-10 text-xs font-normal text-gray-600">{foreignFontSize}px</span>
              </div>
            </div>

            <div className={styles.block}>
              <span className={styles.blockLabel}>中文字体</span>
              <div className="flex h-5 w-full items-center justify-between">
                <Slider.Root
                  value={[translateFontSize]}
                  max={60}
                  min={14}
                  step={4}
                  className="slider"
                  onValueChange={onChangeTranslateFontSize}
                  onValueCommit={onCommitTranslateFontSize}
                >
                  <Slider.Track>
                    <Slider.Range />
                  </Slider.Track>
                  <Slider.Thumb />
                </Slider.Root>
                <span className="ml-4 w-10 text-xs font-normal text-gray-600">{translateFontSize}px</span>
              </div>
            </div>
          </div>
          <button className="my-btn-primary ml-4 disabled:bg-gray-300" type="button" onClick={onResetFontSize} title="重置字体设置">
            重置字体设置
          </button>
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="flex touch-none select-none bg-transparent " orientation="vertical"></ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}
