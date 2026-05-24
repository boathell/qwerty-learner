import styles from './index.module.css'
import { verifySettingPassword } from './verifySettingPassword'
import { keySoundResources } from '@/resources/soundResource'
import { hintSoundsConfigAtom, keySoundsConfigAtom, pronunciationConfigAtom } from '@/store'
import type { SoundResource } from '@/typings'
import { toFixedNumber } from '@/utils'
import { playKeySoundResource } from '@/utils/sounds/keySounds'
import { Listbox, Switch, Transition } from '@headlessui/react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import * as Slider from '@radix-ui/react-slider'
import { useAtom } from 'jotai'
import { Fragment, useCallback, useEffect, useState } from 'react'
import IconCheck from '~icons/tabler/check'
import IconChevronDown from '~icons/tabler/chevron-down'
import IconEar from '~icons/tabler/ear'

export default function SoundSetting() {
  const [pronunciationConfig, setPronunciationConfig] = useAtom(pronunciationConfigAtom)
  const [keySoundsConfig, setKeySoundsConfig] = useAtom(keySoundsConfigAtom)
  const [hintSoundsConfig, setHintSoundsConfig] = useAtom(hintSoundsConfigAtom)
  const [pronunciationVolume, setPronunciationVolume] = useState(pronunciationConfig.volume * 100)
  const [pronunciationTransVolume, setPronunciationTransVolume] = useState(pronunciationConfig.transVolume * 100)
  const [pronunciationRate, setPronunciationRate] = useState(pronunciationConfig.rate ?? 1)
  const [keySoundsVolume, setKeySoundsVolume] = useState(keySoundsConfig.volume * 100)
  const [hintSoundsVolume, setHintSoundsVolume] = useState(hintSoundsConfig.volume * 100)

  useEffect(() => {
    setPronunciationVolume(pronunciationConfig.volume * 100)
    setPronunciationTransVolume(pronunciationConfig.transVolume * 100)
    setPronunciationRate(pronunciationConfig.rate ?? 1)
  }, [pronunciationConfig.rate, pronunciationConfig.transVolume, pronunciationConfig.volume])

  useEffect(() => {
    setKeySoundsVolume(keySoundsConfig.volume * 100)
  }, [keySoundsConfig.volume])

  useEffect(() => {
    setHintSoundsVolume(hintSoundsConfig.volume * 100)
  }, [hintSoundsConfig.volume])

  const onTogglePronunciation = useCallback(
    async (checked: boolean) => {
      if (!(await verifySettingPassword())) return

      setPronunciationConfig((prev) => ({
        ...prev,
        isOpen: checked,
      }))
    },
    [setPronunciationConfig],
  )
  const onTogglePronunciationIsTransRead = useCallback(
    async (checked: boolean) => {
      if (!(await verifySettingPassword())) return

      setPronunciationConfig((prev) => ({
        ...prev,
        isTransRead: checked,
      }))
    },
    [setPronunciationConfig],
  )
  const onChangePronunciationVolume = useCallback((value: [number]) => {
    setPronunciationVolume(value[0])
  }, [])

  const onCommitPronunciationVolume = useCallback(
    async (value: [number]) => {
      if (value[0] === pronunciationConfig.volume * 100) return

      if (!(await verifySettingPassword())) {
        setPronunciationVolume(pronunciationConfig.volume * 100)
        return
      }

      setPronunciationConfig((prev) => ({
        ...prev,
        volume: value[0] / 100,
      }))
    },
    [pronunciationConfig.volume, setPronunciationConfig],
  )
  const onChangePronunciationIsTransVolume = useCallback((value: [number]) => {
    setPronunciationTransVolume(value[0])
  }, [])

  const onCommitPronunciationIsTransVolume = useCallback(
    async (value: [number]) => {
      if (value[0] === pronunciationConfig.transVolume * 100) return

      if (!(await verifySettingPassword())) {
        setPronunciationTransVolume(pronunciationConfig.transVolume * 100)
        return
      }

      setPronunciationConfig((prev) => ({
        ...prev,
        transVolume: value[0] / 100,
      }))
    },
    [pronunciationConfig.transVolume, setPronunciationConfig],
  )
  const onChangePronunciationRate = useCallback((value: [number]) => {
    setPronunciationRate(value[0])
  }, [])

  const onCommitPronunciationRate = useCallback(
    async (value: [number]) => {
      if (value[0] === (pronunciationConfig.rate ?? 1)) return

      if (!(await verifySettingPassword())) {
        setPronunciationRate(pronunciationConfig.rate ?? 1)
        return
      }

      setPronunciationConfig((prev) => ({
        ...prev,
        rate: value[0],
      }))
    },
    [pronunciationConfig.rate, setPronunciationConfig],
  )

  const onToggleKeySounds = useCallback(
    async (checked: boolean) => {
      if (!(await verifySettingPassword())) return

      setKeySoundsConfig((prev) => ({
        ...prev,
        isOpen: checked,
      }))
    },
    [setKeySoundsConfig],
  )
  const onChangeKeySoundsVolume = useCallback((value: [number]) => {
    setKeySoundsVolume(value[0])
  }, [])

  const onCommitKeySoundsVolume = useCallback(
    async (value: [number]) => {
      if (value[0] === keySoundsConfig.volume * 100) return

      if (!(await verifySettingPassword())) {
        setKeySoundsVolume(keySoundsConfig.volume * 100)
        return
      }

      setKeySoundsConfig((prev) => ({
        ...prev,
        volume: value[0] / 100,
      }))
    },
    [keySoundsConfig.volume, setKeySoundsConfig],
  )

  const onChangeKeySoundsResource = useCallback(
    async (key: string) => {
      const soundResource = keySoundResources.find((item: SoundResource) => item.key === key) as SoundResource
      if (!soundResource) return
      if (soundResource.key === keySoundsConfig.resource.key) return
      if (!(await verifySettingPassword())) return

      setKeySoundsConfig((prev) => ({
        ...prev,
        resource: soundResource,
      }))
    },
    [keySoundsConfig.resource.key, setKeySoundsConfig],
  )

  const onPlayKeySound = useCallback((soundResource: SoundResource) => {
    playKeySoundResource(soundResource)
  }, [])

  const onToggleHintSounds = useCallback(
    async (checked: boolean) => {
      if (!(await verifySettingPassword())) return

      setHintSoundsConfig((prev) => ({
        ...prev,
        isOpen: checked,
      }))
    },
    [setHintSoundsConfig],
  )
  const onChangeHintSoundsVolume = useCallback((value: [number]) => {
    setHintSoundsVolume(value[0])
  }, [])

  const onCommitHintSoundsVolume = useCallback(
    async (value: [number]) => {
      if (value[0] === hintSoundsConfig.volume * 100) return

      if (!(await verifySettingPassword())) {
        setHintSoundsVolume(hintSoundsConfig.volume * 100)
        return
      }

      setHintSoundsConfig((prev) => ({
        ...prev,
        volume: value[0] / 100,
      }))
    },
    [hintSoundsConfig.volume, setHintSoundsConfig],
  )

  return (
    <ScrollArea.Root className="flex-1 select-none overflow-y-auto ">
      <ScrollArea.Viewport className="h-full w-full px-3">
        <div className={styles.tabContent}>
          <div className={styles.section}>
            <span className={styles.sectionLabel}>单词发音</span>
            <div className={styles.switchBlock}>
              <Switch checked={pronunciationConfig.isOpen} onChange={onTogglePronunciation} className="switch-root">
                <span aria-hidden="true" className="switch-thumb" />
              </Switch>
              <span className="text-right text-xs font-normal leading-tight text-gray-600">{`发音已${
                pronunciationConfig.isOpen ? '开启' : '关闭'
              }`}</span>
            </div>
            <div className={styles.block}>
              <span className={styles.blockLabel}>音量</span>
              <div className="flex h-5 w-full items-center justify-between">
                <Slider.Root
                  value={[pronunciationVolume]}
                  max={100}
                  step={10}
                  className="slider"
                  onValueChange={onChangePronunciationVolume}
                  onValueCommit={onCommitPronunciationVolume}
                  disabled={!pronunciationConfig.isOpen}
                >
                  <Slider.Track>
                    <Slider.Range />
                  </Slider.Track>
                  <Slider.Thumb />
                </Slider.Root>
                <span className="ml-4 w-10 text-xs font-normal text-gray-600">{`${Math.floor(pronunciationVolume)}%`}</span>
              </div>
            </div>

            <div className={styles.block}>
              <span className={styles.blockLabel}>倍速</span>
              <div className="flex h-5 w-full items-center justify-between">
                <Slider.Root
                  value={[pronunciationRate]}
                  max={4}
                  min={0.5}
                  step={0.1}
                  className="slider"
                  onValueChange={onChangePronunciationRate}
                  onValueCommit={onCommitPronunciationRate}
                  disabled={!pronunciationConfig.isOpen}
                >
                  <Slider.Track>
                    <Slider.Range />
                  </Slider.Track>
                  <Slider.Thumb />
                </Slider.Root>
                <span className="ml-4 w-10 text-xs font-normal text-gray-600">{`${toFixedNumber(pronunciationRate, 2)}`}</span>
              </div>
            </div>
          </div>
          {window.speechSynthesis && (
            <div className={styles.section}>
              <span className={styles.sectionLabel}>释义发音</span>
              <div className={styles.switchBlock}>
                <Switch checked={pronunciationConfig.isTransRead} onChange={onTogglePronunciationIsTransRead} className="switch-root">
                  <span aria-hidden="true" className="switch-thumb" />
                </Switch>
                <span className="text-right text-xs font-normal leading-tight text-gray-600">{`发音已${
                  pronunciationConfig.isTransRead ? '开启' : '关闭'
                }`}</span>
              </div>
              <div className={styles.block}>
                <span className={styles.blockLabel}>音量</span>
                <div className="flex h-5 w-full items-center justify-between">
                  <Slider.Root
                    value={[pronunciationTransVolume]}
                    max={100}
                    step={10}
                    className="slider"
                    onValueChange={onChangePronunciationIsTransVolume}
                    onValueCommit={onCommitPronunciationIsTransVolume}
                  >
                    <Slider.Track>
                      <Slider.Range />
                    </Slider.Track>
                    <Slider.Thumb />
                  </Slider.Root>
                  <span className="ml-4 w-10 text-xs font-normal text-gray-600">{`${Math.floor(pronunciationTransVolume)}%`}</span>
                </div>
              </div>
            </div>
          )}

          <div className={styles.section}>
            <span className={styles.sectionLabel}>按键音</span>
            <div className={styles.switchBlock}>
              <Switch checked={keySoundsConfig.isOpen} onChange={onToggleKeySounds} className="switch-root">
                <span aria-hidden="true" className="switch-thumb" />
              </Switch>
              <span className="text-right text-xs font-normal leading-tight text-gray-600">{`发音已${
                keySoundsConfig.isOpen ? '开启' : '关闭'
              }`}</span>
            </div>
            <div className={styles.block}>
              <span className={styles.blockLabel}>音量</span>
              <div className="flex h-5 w-full items-center justify-between">
                <Slider.Root
                  value={[keySoundsVolume]}
                  max={100}
                  min={1}
                  step={10}
                  className="slider"
                  onValueChange={onChangeKeySoundsVolume}
                  onValueCommit={onCommitKeySoundsVolume}
                  disabled={!keySoundsConfig.isOpen}
                >
                  <Slider.Track>
                    <Slider.Range />
                  </Slider.Track>
                  <Slider.Thumb />
                </Slider.Root>
                <span className="ml-4 w-10 text-xs font-normal text-gray-600">{`${Math.floor(keySoundsVolume)}%`}</span>
              </div>
            </div>
            <div className={`${styles.block}`}>
              <span className={styles.blockLabel}>按键音效</span>
              <Listbox value={keySoundsConfig.resource.key} onChange={onChangeKeySoundsResource}>
                <div className="relative">
                  <Listbox.Button className="listbox-button w-60">
                    <span>{keySoundsConfig.resource.name}</span>
                    <span>
                      <IconChevronDown className="focus:outline-none" />
                    </span>
                  </Listbox.Button>
                  <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <Listbox.Options className="listbox-options z-10">
                      {keySoundResources.map((keySoundResource) => (
                        <Listbox.Option key={keySoundResource.key} value={keySoundResource.key}>
                          {({ selected }) => (
                            <>
                              <div className="group flex cursor-pointer items-center justify-between">
                                <span>{keySoundResource.name}</span>
                                {selected ? (
                                  <span className="listbox-options-icon">
                                    <IconCheck className="focus:outline-none" />
                                  </span>
                                ) : null}
                                <IconEar
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    onPlayKeySound(keySoundResource)
                                  }}
                                  className="mr-2  hidden cursor-pointer text-neutral-500 hover:text-indigo-400 group-hover:block dark:text-neutral-300"
                                />
                              </div>
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>

          <div className={styles.section}>
            <span className={styles.sectionLabel}>效果音</span>
            <div className={styles.switchBlock}>
              <Switch checked={hintSoundsConfig.isOpen} onChange={onToggleHintSounds} className="switch-root">
                <span aria-hidden="true" className="switch-thumb" />
              </Switch>
              <span className="text-right text-xs font-normal leading-tight text-gray-600">{`发音已${
                hintSoundsConfig.isOpen ? '开启' : '关闭'
              }`}</span>
            </div>
            <div className={styles.block}>
              <span className={styles.blockLabel}>音量</span>
              <div className="flex h-5 w-full items-center justify-between">
                <Slider.Root
                  value={[hintSoundsVolume]}
                  max={100}
                  min={1}
                  step={10}
                  className="slider"
                  onValueChange={onChangeHintSoundsVolume}
                  onValueCommit={onCommitHintSoundsVolume}
                  disabled={!hintSoundsConfig.isOpen}
                >
                  <Slider.Track>
                    <Slider.Range />
                  </Slider.Track>
                  <Slider.Thumb />
                </Slider.Root>
                <span className="ml-4 w-10 text-xs font-normal text-gray-600">{`${Math.floor(hintSoundsVolume)}%`}</span>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="flex touch-none select-none bg-transparent " orientation="vertical"></ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}
