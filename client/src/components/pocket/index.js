import React, { useState, useEffect } from 'react';
import { CenterCard121 } from '../utils';
import PlaidLink from 'react-plaid-link'
import request from '../../redux/request';
import testData from './test';
const Component =() => {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [accountFilter, setAccountFilter] = useState('');
  
  useEffect(() => {
      if(testData){
        setAccounts(testData.accounts)
        setTransactions(testData.transactions)
      }else{
        request.post('/api/bank/get_transactions')
        .then(({data})=>{
          console.log(data)
          setAccounts(data.accounts)
          setTransactions(data.transactions)
        }).catch(err=>{
          console.log(err)
        }) 
      }
  },[])
  const handleOnSuccess = (token, metadata) => {
    // send token to client server
    console.log(token, metadata)
    request.post('/api/bank/create_access_token', {
      public_token: token,
      accounts: metadata.accounts,
      institution: metadata.institution
    }).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  }
  const handleOnExit = () => {
    // handle the case when your user exits Link
  }
  return <div>
    <CenterCard121>
    <div className='card'>
      <h4 className='card-header'>
        Connect with your bank.
      </h4>
      <div className='card-body'>
        <PlaidLink
          clientName="mapitout Pocket"
          env="sandbox"
          product={["auth", "transactions"]}
          publicKey="e4de42224b6f00fd362747ea130226"
          onExit={handleOnExit}
          onSuccess={handleOnSuccess}>
          Open Link and connect your bank!
        </PlaidLink>
      </div>
    </div>
  </CenterCard121>
  <div>
    <div className='row'>
      <div className='col-xs-12 col-sm-1 col-md-1 col-xl-1'></div>
      <div className='col-xs-12 col-sm-5 col-md-5 col-xl-5'>
        {accounts.length>0&&<div className='card'>
          <h4 className='card-header'>
            Accounts
          </h4>
          <div className='card-body'>
            {accounts.map(account=>{
              return <div key={account.account_id} onClick={()=>accountFilter()}>
                <b>{account.name}<br/></b>
                ({account.account_id})
              </div>
            })}
          </div>
        </div>}
      </div>
      <div className='col-xs-12 col-sm-5 col-md-5 col-xl-5'>
        {transactions.length>0&&<div className='card'>
          <h4 className='card-header'>
            Transactions
          </h4>
          <div className='card-body'>
            {transactions.map(transaction=>{
              return <div key={transaction.transaction_id}>
                <b>{transaction.date} {transaction.name} <br/></b>
                {transaction.account_id} {transaction.amount}
              </div>
            })}
          </div>
        </div>}
      </div>
      <div className='col-xs-12 col-sm-1 col-md-1 col-xl-1'></div>
    </div>
  </div>
  </div>
}

export default Component;
