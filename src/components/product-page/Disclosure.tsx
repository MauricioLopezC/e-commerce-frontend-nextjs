import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

function ProductDisclosure({ title, content }: { title: string, content: string }) {
  return (
    <Disclosure as="div" defaultOpen={true}>
      <DisclosureButton className="py-2 group flex w-full items-center justify-between">
        <span className='font-bold text-lg text-black group-data-[hover]:text-black/80'>{title}</span>
        <ChevronDownIcon className='size-5  group-data-[hover]:fill-black group-data-[open]:rotate-180' />
      </DisclosureButton>
      <DisclosurePanel className="mt-2 text-sm/5 text-black/50">
        {content}
      </DisclosurePanel>
    </Disclosure>
  )
}

export default ProductDisclosure
