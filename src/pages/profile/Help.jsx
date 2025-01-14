import React from 'react'
import { Accordion } from "flowbite-react";
import { FaWhatsapp } from "react-icons/fa";
const Help = () => {
    const styleAccordion = {
        backgroundColor: '#555555',
        marginTop: '25px',
        borderRadius: '10px 10px   0  0',
        borderColor: '#3c3c3b',
        boxShadow: '0 0 10px #3c3c3b',
      
      };
  return (
    <Accordion dir='rtl' collapseAll style={styleAccordion}>
        
    <Accordion.Panel  className='bg-black-color-dark  shadow-md '>
      <Accordion.Title className='text-numberNotfound font-bold py-1.25 px-0 focus:outline-none rounded-lg focus:ring-0 dark:numberNotfound dark:bg-black-color-dark    hover:bg-secondary-color'>
        <div className='flex justify-between items-center gap-5 mr-2.5'>
        المساعده
        </div>
      </Accordion.Title>
      <Accordion.Content>
      <div class=" rounded-lg relative">
            <h2 class="text-center md:text-xl mt-0">مرحبا بك فى منصه مستر عمر</h2>
            <div class="flex items-center">
              <div className='mt-4'>
                <span class="block mb-2 font-bold">معك الاستاذ محمد</span>
                <span class="text-gray-200">سيتم الرد عليك فى اقرب وقت</span>
              </div>
            </div>
            <div class="leading-relaxed border-t border-b border-gray-200 text-center py-8 mt-8 mb-8 md:text-lg text-base">
            ان احتجت شئ لا تتردد فى السؤال اترك سؤالك فى رساله على الواتس وسيتم التواصل معك فى اسرع وقت شكرا لك.
            </div>
            <div class="flex items-center justify-center text-gray-200">
              
              <div className='flex items-center '>
              
              <span className='md:text-xl'>1025946540 +20</span>
              <FaWhatsapp className='mr-4 text-2xl' />
              </div>
               
            </div>
          </div>
      </Accordion.Content>
    </Accordion.Panel>
  
</Accordion> 
  )
}

export default Help