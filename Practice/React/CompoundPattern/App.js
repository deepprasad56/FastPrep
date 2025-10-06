import { createContext, useContext, useState } from 'react';
const TabsContext = createContext()

function Tabs({children}) {
  let [activeTab, setActiveTab] = useState(0)
 

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className='tabs'>{children}</div>
    </TabsContext.Provider>
  )
}

function TabList({children}) {
  return (
    <div className='tablist'>{children}</div>
  )
}
function Tab({ index, children }) {

  let {activeTab,setActiveTab} = useContext(TabsContext)
  let isActive= activeTab==index
  return (
    <button className={isActive?"tab active":"tab"} onClick={()=>setActiveTab(index)}>{children}</button>
  )
}

function TabPanels({ children }) {
  let { activeTab }=useContext(TabsContext)
  return (
    <div className="tab_panels">
      {children[activeTab]}
    </div>
  )
}

function TabPanel({children}) {
  return (
    <div className="tabpanel">
       {children}
    </div>
  )
}

export default function App() {
  return (
    <>
     
      <Tabs>
        <TabList >
          <Tab index={0}>
          Home
          </Tab>
          <Tab index={1}>
            Profile
          </Tab>
          <Tab index={2}>
            Settings
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
          Welcome To Home
          </TabPanel>
          <TabPanel>
          Welcome To Profile
          </TabPanel>
          <TabPanel>
          Welcome To Settings
          </TabPanel>
        </TabPanels>

      </Tabs>
   </>
  )
}



