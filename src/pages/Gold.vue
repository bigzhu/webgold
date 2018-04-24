<template>
  <div class="layout-padding row justify-center">
    <div style="width: 500px; max-width: 90vw;">
      <q-input v-model="gold_conf.worst" type="number" float-label="Worst" />
      <q-input v-model="gold_conf.atr" type="number" float-label="ATR" />
      <q-radio v-model="gold_conf.oper" val="buy" label="Buy" />
      <q-radio v-model="gold_conf.oper" val="sell" label="Sell" />
      <q-input v-model="gold_conf.best" type="number" float-label="Best" />
      <q-input v-model="gold_conf.week_atr" type="number" float-label="Week ATR" />

      <q-btn icon="done" @click="done">Submit</q-btn>
      <br>
      <br>

      <table class="q-table q-table-horizontal-separator">
        <thead>
          <tr>
            <th class="text-center">amount</th>
            <th class="text-center">{{gold_conf.oper}}</th>
            <th class="text-center">lose</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i,index) in trade.steps" :key="index">
            <td class="text-left">{{i.amount}}</td>
            <td class="text-left">{{i.in}}</td>
            <td v-if="i.lost!==0" class="text-left bg-red-11">-{{i.lost}}</td>
            <td v-if="i.lost===0" class="text-left"></td>
          </tr>
        </tbody>
      </table>

      <br>
      <table class="q-table cell-separator bordered striped highlight">
        <thead>
          <tr v-if="trade.stop==trade.reverse">
            <th class="text-right">stop is reverse</th>
            <th class="text-left bg-red-11">{{trade.stop}}</th>
          </tr>
          <tr v-if="trade.stop!=trade.reverse">
            <th class="text-right">stop</th>
            <th class="text-left bg-red-11">{{trade.stop}}</th>
            <th class="text-right">reverse</th>
            <th class="text-left bg-red-11">{{trade.reverse}}</th>
          </tr>
        </thead>
      </table>
      <table class="q-table cell-separator bordered striped highlight">
        <thead>
          <tr>
            <th class="text-center">out1</th>
            <th class="text-center bg-green-11">{{trade.out_1}}</th>
            <th class="text-center">out2</th>
            <th class="text-center bg-green-11">{{trade.out_2}}</th>
            <th class="text-center">out3</th>
            <th class="text-center bg-green-11">{{trade.out_3}}</th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data: function() {
      return {
        type: 'gold',
        gold_conf: {
          type: 'gold'
        },
        trade: {}
      }
    },
    mounted: function() {
      this.getConf()
      this.getTrade()
      this.$nextTick(function() {
        // code that assumes this.$el is in-document

      })
    },
    methods: {
      getConf() {
        axios.get('/api_gold')
          .then((response) => {
            this.gold_conf = response.data || {}
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      done() {
        axios.post('/api_gold', this.gold_conf)
          .then((responsne) => {
            this.getTrade()
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      getTrade() {
        axios.get('/api_trade')
          .then((response) => {
            this.trade = response.data
          })
          .catch(function(error) {
            console.log(error)
          })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
