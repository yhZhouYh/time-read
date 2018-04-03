<template>
    <div class="read">
        <navbar mode="foot" direction="top" :isExpand="topbar">
            <z-header bckColor="rgba(0, 0, 0, 0.6)">
                <icon icon="icon-wode" slot="right" @click.native="login" v-if="!isLogin"></icon>
                <img slot="right" :src="account.avatar" v-else class="avatar" @click="goUser">
                <span slot="middle">{{bookInfo.book_name}}</span>
            </z-header>
        </navbar>
        <navbar mode="side" direction="left" :isExpand.sync="showSideBar" zIndex="6000" mask>
            <category-menu @getChapter="getChapterApi" :model="menu"></category-menu>
        </navbar>
        <navbar mode="foot" direction="bottom" :isExpand="footbar">
            <footbar></footbar>
        </navbar>
        <footset @checkcolor="checkcolor" @larger="larger" @smaller="smaller" :show="showSetMenu"></footset>
        <div class="middleclick" @click="middleclick" v-if="!bookInfo.need_pay"></div>
        <div class="rightClick" @click="rightClick"></div>
        <div class="leftClick" @click="leftClick"></div>
        <div class="read-container" ref="readContainer" :class="{moon}" :style="[theme]">
            <div class="zflex read-top-info">
                <div class="zflex1 title">{{bookInfo.title}}</div>
                <div>{{currentPage}}/{{pages}}</div>
            </div>
            <!-- <div class="middleclick" @click="middleclick" v-if="!bookInfo.need_pay"></div> -->
            <div class="read-content" ref="readBox">
                <!-- <div class="scroller" ref="scroller"></div> -->
                <!--    -->
                <div v-if="!bookInfo.need_pay" v-html='splitContent' :style="{fontSize: readSet.fontSize + 'px'}" class="bbb"></div>
                <div class="need-pay" v-if="bookInfo.need_pay">
                    <div class="money-icon">
                        <icon icon="icon-qianbao"></icon>
                    </div>
                    <div class="book-title">{{bookInfo.title}}</div>
                    <div class="pay-info">购买本书（
                        <span class="red">￥{{bookInfo.bookPrice}}</span>）,阅读以下内容</div>
                    <x-button class="ts-btn" @click.native="buy">购买</x-button>
                    <div class="middleclick" @click="middleclick"></div>
                </div>

                <!-- </> -->
            </div>

        </div>
        <confirm v-model="showCacheClean" title="清除缓存" @on-cancel="onCancel" @on-confirm="onConfirm">
            <p style="text-index:2em;text-align:left;">系统会自动记录读者的阅读与章节记录，清除缓存会丢失阅读进度，如果数据错乱可选择确定</p>
        </confirm>
    </div>
</template>
<script>
import AlloyTouch from '../../assets/lib/alloy_touch'
import Transform from '../../assets/lib/transform'
import {
  getBook,
  getNextChaper,
  getPreChapter,
  getChapter,
  createOrder,
  getMenu,
  bookDetails
} from '../../api'
import Navbar from '../common/Navbar'
import footbar from './footbar'
import footset from './footset'
import categoryMenu from './menu'
import Icon from '../common/Icon'
import XButton from 'vux/src/components/x-button'
import Confirm from 'vux/src/components/confirm'
export default {
  name: 'read',
  components: {
    Navbar,
    footbar,
    footset,
    categoryMenu,
    Icon,
    XButton,
    Confirm
  },
  data() {
    return {
      step: 0, //滑动页数
      touch: null, //绑定滑动手势事件
      pod: {
        episode: 12, //章节数
        rate: 0.0345, //阅读百分比
        cid: 2
      }, //小说内容
      // leftbar: false, //侧边目录栏展开态
      footbar: false, //底部目录栏展开态
      topbar: false, //顶部栏展开状态
      readSet: this.$store.state.readSet, //阅读器设置

      // fontSize: this.readSet.statefontSize,
      // content: '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="zh-CN"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><meta name="provider" content="www.cnepub.com" /><meta name="builder" content="epubBuilder present by www.cnepub.com" /><meta name="right" content="该文档由epubBuilder生成。epubBuilder为掌上书苑（www.cnepub.com)提供的epub制作工具，仅供个人交流与学习使用。在未获得掌上书苑的商业授权前，不得用于任何商业用途。" /><link rel="stylesheet" type="text/css" href="css/main.css" /><title>第一章</title></head><body><div><h3>第一章</h3><p></p><p></p><p></p><p></p><p>9月10日，南国的盛夏，烈日炎炎。</p><p>大学新鲜人郑微憋红了一张脸和出租车司机一起将她的两个大皮箱半拖半拽从车尾箱里卸了下来，抬头用手背擦汗的时候，透过树叶间隙直射下来的耀眼阳光让她眼前短暂地一黑。她用手在牛仔裤的口袋里掏了掏，翻出了出门前妈妈给她备下的零钱，递给身边的出租车司机，笑眯眯地说道，“谢谢啊，叔叔。”</p><p>看上去未满30岁的司机小伙子被眼前这个小姑娘笑容可掬而又字正腔圆的一句话闹了个大红脸，匆匆找钱的时候，连零头都没好意思收。</p><p>郑微站在惟一可以遮荫的大树下，一边用手扇风，一边打量着这个她即将要战斗和生活四年的地方。她所在的位置是一条长长的校园林荫道，道路的两边是她叫不出名的亚热带树木，可以想象黄昏的时候散步在这样一条道路上应该是比较有意境的事情，然而现在整条路的人行道基本上被熙熙攘攘的人和大大小小的桌子挤了个水泄不通，不时有私家车、出租车开到她附近的位置，再也前进不了，当然，更多的是学校的大巴，从车站将新生接了过来，一拨一拨的，都是像她一样拖着大件行李的年轻面孔，还有陪同孩子前来报名的家长，无一例外地表情比学生更焦急凝重。</p><p>郑微看着他们就笑了，她想，要是她妈妈跟着来了，应该也是这付皇帝不急太监急的模样吧。爸爸和妈妈都说过要送她来学校，可是她在他们面前拍了胸脯，“不用不用，我一个年满十八岁的聪明少女，难道连入学报到都应付不来？你们老跟着未免太小看人了，别忘了我8岁的时候已经知道一个人坐3个小时的车上奶奶家去了。放心吧，放心吧！”</p><p>他们是不怎么放心的，但是毕竟工作也忙，她又再三保证、强调，加上高中同学里有三个也是考到了这个城市，正好可以结伴而行，相互有个照应，于是，在经历了父母的再三叮嘱和语重心长地防拐卖教育后，郑微在火车站挥手告别了同行的两个同学，独自站在了G大的土地上。</p><p>还来不及把四周的环境打量个遍，就有四五个男生走了上来，脸上堆着老生特有的热情和故作老成的笑容，其中一个问：“同学你是新生吧？哪个系的呀？”</p><p>“我？土木工程的。”郑微老老实实回答。</p><p>“土木系的呀？”一个瘦高的男生眼睛一亮，“那也算是我们的师妹了，我们是专门负责接待新生的，你跟我来，我带你去办入学手续。”说完几个人不由分说就接过了郑微的行李。</p><p>郑微对男生的所有印象都还停留在高中时，那些喜欢叫女生绰号，经常为了一道题跟女孩子争得面红耳赤，拖拉着不肯主动擦黑板，不屑与女生为伍的的男同学是她所熟悉的，因此一时之间她还对大学里男生突如其来的殷勤和绅士风度感到非常不习惯。</p><p>“哦，这个皮箱的轮子在火车站附近坏掉了。”她对那个主动拉过最大那个皮箱的男生说。</p><p>“没事，别看咱们瘦，咱们有肌肉，不就一个皮箱嘛，小意思。”男生笑了笑，作势就把皮箱单手往上一提，第一次皮箱在水泥地板上纹丝不动，他明显愣了愣，有些不敢置信的双手施力，这一次终于顺利提了起来，郑微和另外几个男生走在他的身后，发现他明显地脚步虚浮。</p><p>根据他们的建议，首先是把宿舍钥匙领到手，先把行李和床位安置好，再慢慢办那些繁杂的手续也不迟，郑微表示同意。刚走了几步，她就看到了一块写着“建筑工程学院土木系”的接待牌，终于找到组织一般地正想走过去，那几个男生纷纷说，“没事，我们也是建筑工程学院的，都一样。”接待牌旁边站着的几个男生看到他们几个，笑着挤眉弄眼，“老张，你们运气不错哦，小妹妹那个系的呀？”</p><p>那个瘦高的男生显然就是他们口中的老张，他挠头嘿嘿一笑，“土木系的小师妹。”</p><p>话音刚落就有人嚷了起来，“老张你也太狼了，刚才你们环境工程的来了四五个男生，下车后傻呆呆地站在路边都没人理，我们土木的妹妹本系的人还没瞄见，你先扑上去了 ; ;”</p><p>“都一样都一样，我们环境并入建筑工程学院了，大家都是一家，不分彼此，不分彼此。”</p><p>郑微偷笑着用手继续扇风，假装没有听见这饿狗抢食一般地争论，这个时候保持适当的缄默是聪明少女的最好选择。</p><p>争论的结果是老张的“合同一家”理论站了上风，成功地保护了胜利的果实。往宿舍方向走去的一路上，几个男生争先恐后地说着话，把她的姓名系别专业原籍通通打听了个遍，并且不失时机地进行了详细的自我介绍，最绝的堪称老张，他塞给郑微一张早已准备好的自制名片，上面姓名专业联系电话宿舍门牌一应俱全，居然连血型和兴趣爱好都有，堪称浓缩而精辟，郑微叹为观止地收下，塞进自己的小包包里，心里对这个环境工程系的大三师兄景仰之情滔滔不绝。说实话，习惯了跟男生称兄道弟、互拍桌子的郑微对大学第一天这样众星捧月的待遇颇有些不习惯，不过从学校的一头走到另一头，满眼都是人，但是女生却寥寥无几，这才相信开学之前听说的她考上的这所南方最著名的工科大学男女生比例为9：1的传言非虚，也无怪乎这些男生一个两个饥渴至死的表情。</p><p>理工科的女生原本就比较少，大多数都张得比较抽象，想她郑微虽然不是什么绝代美女，跟她漂亮的妈妈相比也有一定差距，但她的圆脸上长着小巧的尖下巴，眼睛大而灵动，鼻子也堪称秀气，尤其胜在皮肤白皙无暇，妈妈也承认这是她年轻的时候也比不上的，因此，根据郑微无数次揽镜自照的鉴定结果，她绝对称得上是人见人爱花见花开的美少女，简直就是穷摇阿姨笔下的女主角，虽然穷摇阿姨的小说已经落伍几个世纪了，但阿姨的审美观还是历久弥新的，看她挑中的连续剧女主角一个比一个红就知道了。就连一向很少夸人的林静也曾说过她不说话的时候还是相当有迷惑性的，称得上“静若处子”，当然，郑微很自觉地过滤掉了他后半句“动若疯兔”的评价，完全当作他对她的肯定。</p><p>所以，走在老张身后的郑微一边同情地看着那个喘气连连的扛皮箱的男生，一边在心里嘿嘿偷笑，看来上了个工科大学也有个附加的好处，在这母猪都被捧成玛丽莲梦露的地方，好日子还在后头呢。</p><p>在舍管科的阿姨那领到钥匙后，郑微顺利地找到了门牌为402的宿舍，推门进去，是一个六人的小单间，窄是窄了点，但阳台卫生间都具备，她对这个一向不挑剔，看了看四周，六张床上已经有三张摆放了行李，看来她是第四个。听舍管科的阿姨说，由于宿舍不足，没办法按照班级给她安排住的地方，所以她所在的是一个混合的宿舍。于是她在靠近洗手间的床位上挑了个下铺，今后这里就是她的地盘了，转过头，才发现几个帮忙的男生还在等着他，其中工作量最大的那一个汗流得洗过澡似的。</p><p>妈妈说出门在外嘴巴要甜，于是她笑眯眯地对着几个师兄连说谢谢，他们果然受用，老张更是大手一挥：“这算什么，小意思。”豪爽的姿态让人差点忘记了他一路上是空着手只动嘴皮的那个人。</p><p>办入学手续的路上，扛皮箱的男生才缓过劲来，气若游丝地问了一句：“我可不可以知道你皮箱里装的是什么。”</p><p>郑微嘻嘻一笑，“我的全部家当。”</p><p>办入学手续的人还是那么多，好在老张交游广阔，八面玲珑，领着她四处穿梭打点，竟然免去了好几次排队之苦，绕是如此，几十分钟以后，当郑微办妥了全部的手续重新站在树荫下，不禁感叹，这鬼地方真热呀，她原本以为自己称得上是地道的南方人，哪知道来到这亚热带的城市，才发现她那东部省份的家乡绝对算是气候凉爽宜人。不过没有关系，她总算如愿以偿了，想到这里，她强忍着雀跃，在心里大声说：“我终于来了，林静！”</p><p></p></div></body></html>',
      content: '',
      currentRatios: 0, //当前阅读占比
      bookInfo: {
        //阅读信息
        book_name: '',
        bookPrice: '',
        chapter_num: 0,
        cid: 0,
        need_pay: 0,
        title: '',
        html: '',
        pageScroll: 0,
        pageMin: 0,
        isPay: 0
      },
      bookInfos: this.$store.state.bookInfo,
      premin: 0,
      pageInfos: this.$store.state.pageInfos[this.book_uid],
      book_uid: this.$route.params.bookId,
      pArr: [], //段落offset数组
      finalOperate: null,
      menu: [], //目录
      pages: 1, //当前章总页数
      currentPage: 1, //当前页
      timer: null
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.account.uid ? true : false
    },
    account() {
      return this.$store.state.account
    },
    //是否开启夜间模式
    moon() {
      return this.$store.state.footData.moon.active
    },
    //是否展示设置菜单
    showSetMenu() {
      return this.$store.state.footData.set.active
    },
    showCacheClean: {
      get() {
        return this.$store.state.footData.cache.active
      },
      set(newValue) {
        this.$store.state.footData.cache.active = newValue
      }
    },
    //是否显示侧边栏
    showSideBar: {
      get() {
        return this.$store.state.footData.menu.active
      },
      set(newValue) {
        this.$store.state.footData.menu.active = newValue
      }
    },
    rateRatio() {
      if (this.pod.rate) {
        return this.pod.rate * 100 + '%'
      }
    },
    theme() {
      //当不是夜间模式的时候
      if (!this.moon) {
        return {
          backgroundColor: this.readSet.themeColor
        }
      }
    },
    //处理返回的html字符串
    splitContent() {
      let html = this.bookInfo.html

      if (html) {
        var indexBody = html.indexOf('body')
        var start = html.indexOf('>', indexBody) + 1
        var end = html.indexOf('</body>')

        return html.substring(start, end)
      }
    }
  },

  mounted() {
    // document.addEventListener('visibilitychange', () => {
    //     //  var state = document.visibilityState
    //     // console.log(document.visibilityState)
    // })
    setTimeout(() => {
      this.middleclick()
    }, 0)
    // this.foo()
  },

  async created() {
    let [bookDetail, menu] = await Promise.all([
      bookDetails({ bookId: this.book_uid }),
      getMenu({ book_uid: this.book_uid })
    ])
    this.menu = menu
    //如果有章节id直接加载
    if (this.$route.query.chapterId) {
      this.getChapterApi(this.$route.query.chapterId)
      return
    }
    if (this.bookInfos.book_name == bookDetail.bookName) {
      this.bookInfo = this.bookInfos
      if (!this.bookInfo.html && bookDetail.isBuy) {
        //重新请求当前章节信息
        let requestData = await getChapter({
          book_uid: this.book_uid,
          cid: this.bookInfo.cid,
          type: 'current'
        })
        this.bookInfo = { ...this.bookInfo, ...requestData }
        this.$store.dispatch('setSinglePageInfo', this.bookInfo) //存储当前页
      }
      this.$nextTick(() => {
        this.bindTouch()
        this.pages = this.getPages(this.bookInfo.pageMin, this.touch.step)
        this.currentPage = this.getPages(
          this.bookInfo.pageScroll,
          this.touch.step
        )
        if (this.bookInfo.pageScroll) {
          this.touch.target[this.touch.property] = this.bookInfo.pageScroll
        }
      })
    } else {
      this.reset()
    }
  },

  methods: {
    async reset() {
      let book = await getBook({
        book_uid: this.book_uid
      })
      this.bookInfo = {
        ...this.bookInfo,
        ...book,
        ...{ pageScroll: 0, pageMin: 0, isPay: 0 }
      }
      this.$store.dispatch('setSinglePageInfo', this.bookInfo) //存储当前页
      //存储整篇信息
      let pageInfos = this.$store.state.pageInfos
      pageInfos[this.book_uid] = {}
      if (!this.bookInfo.need_pay) {
        pageInfos[this.book_uid][this.bookInfo.cid] = {
          ...this.bookInfo,
          ...book
        }
        this.$store.dispatch('getPageInfo', pageInfos)
      }
      this.$nextTick(() => {
        this.bindTouch()
        this.pages = this.getPages(this.bookInfo.pageMin, this.touch.step)
        this.currentPage = this.getCurrentPages(
          this.bookInfo.pageScroll,
          this.touch.step
        )
        this.touch.target[this.touch.property] = this.bookInfo.pageScroll
      })
    },
    compare(v1, v2) {
      if (v1 < v2) {
        return -1
      } else if (v1 > v2) {
        return 1
      } else {
        return 0
      }
    },
    async getdata() {
      let data = await getBook({
        book_uid: '103572756395',
        member_uid: '21312312312',
        cid: 2,
        buy_flag: 1
      })
    },
    bindTouch(fontSize = false, newBind) {
      let _this = this
      let readBox = this.$refs.readBox
      let readContainer = this.$refs.readContainer
      let min = -(readBox.scrollWidth - readBox.clientWidth)
      //let pageInfos = this.$store.state.pageInfos[this.book_uid]
      // pageInfos[this.bookInfo.cid].pageMin = min
      this.bookInfo.pageMin = min
      let options = {
        css: true,
        target: readBox,
        touch: readContainer,
        vertical: false,
        property: 'translateX',
        min: min,
        max: 0,
        step: readBox.clientWidth + 40,
        // spring: true,
        // inertia: false,
        lockDirection: true,
        bindSelf: true,
        touchEnd(evt, v, index) {
          _this.footbar = false // 隐藏底部栏
          _this.topbar = false //隐藏头部栏
          _this.$store.dispatch('cancelFoot') //取消激活菜单
          var step_v = index * this.step * -1
          var dx = v - step_v
          if (v < this.min) {
            //下一章
            _this.step = this.min
            _this.bookInfo.pageScroll = _this.step
            _this.loadNext()
            if (_this.bookInfo.cid < _this.bookInfo.chapter_num - 1) {
              return false
            }
            return
          } else if (v > this.max) {
            //上一章
            _this.step = this.max
            _this.bookInfo.pageScroll = _this.step
            _this.loadPrev()
            if (_this.bookInfo.cid !== 0) {
              return false
            }
            return
          } else if (Math.abs(dx) < 30) {
            //滑动小于30 不换页
            _this.step = step_v
          } else if (dx > 0) {
            //向前
            _this.step = step_v + this.step
          } else {
            //向后
            _this.step = step_v - this.step
          }
          _this.record(this, _this.step) //记录信息
          this.to(_this.step) //动画运动到指定位置
          return false
        }
      }

      Transform(readBox)
      if (this.touch != null) {
        //改变字体大小后 需要重新定位阅读位置
        if (fontSize) {
          let index = _this.getPageIndex(
            -this.touch.min,
            this.touch.step,
            _this.currentRatios
          )
          let go = -index * this.touch.step
          if (index * this.touch.step > Math.abs(min)) {
            go = min
          }
          this.touch.target.translateX = go
        }
        //销毁实例对象
        this.touch.target.style.cssText = ''
        this.touch.destroy()
        this.touch = null
      }
      this.touch = new AlloyTouch(options)
    },
    //点击中部触发栏
    middleclick() {
      this.footbar = !this.footbar
      this.topbar = !this.topbar
      if (!this.footbar) {
        this.$store.dispatch('cancelFoot')
      }
      // clearTimeout(this.timer)
      // this.timer == null
      // if (this.timer == null) {
      //     this.timer = setTimeout(() => {
      //         this.middleclick()
      //         this.timer = null
      //     }, 2000)
      // }
    },
    //计算阅读百分比
    getRate(episodeWidth, episodeLength, pageWidth, epidoseIndex) {
      // let rate = (epidoseIndex/episodeLength) + pageWidth /
    },

    //计算页数
    getPages(min, step) {
      return Math.abs(Math.ceil(min / step)) + 1
    },

    //计算当前页数
    getCurrentPages(pageScroll, step) {
      if (!step) {
        return 1
      }
      return Math.abs(Math.ceil(pageScroll / step)) + 1
    },

    //根据当前章阅读百度分计算页面scroll
    getPageIndex(min, step, ratio) {
      return Math.abs(Math.ceil(min * ratio / step))
    },
    //换主题颜色
    checkcolor(color) {
      this.readSet.themeColor = color
      this.$store.dispatch('setReadSet', this.readSet)
    },
    //扩大字号
    larger() {
      if (this.readSet.fontSize < 30) {
        this.readSet.fontSize += 3
        // setTimeout(() => {
        //     this.bindTouch()
        // }, 100)
        this.$nextTick(() => {
          console.log('dom更新了')
          this.bindTouch(true)
          this.pages = this.getPages(this.bookInfo.pageMin, this.touch.step)
          this.currentPage = this.getCurrentPages(
            this.bookInfo.pageScroll,
            this.touch.step
          )
        })
        this.$store.dispatch('setReadSet', this.readSet)
      }
    },
    //缩小字号
    smaller() {
      if (this.readSet.fontSize > 18) {
        this.readSet.fontSize -= 3
        this.$nextTick(() => {
          console.log('dom更新了')
          this.bindTouch(true)
          this.pages = this.getPages(this.bookInfo.pageMin, this.touch.step)
          this.currentPage = this.getCurrentPages(
            this.bookInfo.pageScroll,
            this.touch.step
          )
        })
        this.$store.dispatch('setReadSet', this.readSet)
      }
    },
    //加载下一章
    async loadNext() {
      let cid = Number(this.bookInfo.cid) + 1
      if (cid < this.bookInfo.chapter_num) {
        this.loadChapter(cid, 'next', () => {
          this.touch.target.style.cssText = ''
          this.touch.target[this.touch.property] = this.bookInfo.pageScroll
          //   return false
        })
        // return false
      }
    },
    //加载上一章
    async loadPrev() {
      let cid = Number(this.bookInfo.cid) - 1
      if (cid >= 0) {
        this.loadChapter(cid, 'last', () => {
          this.touch.target.style.cssText = ''
          this.touch.target[this.touch.property] = this.bookInfo.pageScroll
        })
      }
    },
    // 加载章节
    async getChapterApi(id) {
      this.loadChapter(id, 'current', () => {
        this.touch.target.style.cssText = ''
        this.touch.target[this.touch.property] = this.bookInfo.pageScroll
        this.showSideBar = false
      })
    },

    //加载章节
    async loadChapter(cid, type, handeler) {
      let pageInfos = this.$store.state.pageInfos
      let cacheData = null
      if (pageInfos[this.book_uid]) {
        cacheData = pageInfos[this.book_uid]
      }
      let currentCid = this.bookInfo.cid
      if (type == 'current') {
        currentCid = cid
      }
      if (cacheData != null && cacheData[cid]) {
        this.bookInfo = { ...cacheData[cid] }
        this.$store.dispatch('setSinglePageInfo', this.bookInfo)
      } else {
        let requestData = await getChapter({
          book_uid: this.book_uid,
          cid: currentCid,
          type
        })
        this.bookInfo = {
          ...this.bookInfo,
          ...requestData,
          ...{ pageScroll: 0, pageMin: 0, isPay: 0 }
        }

        if (cacheData == null) {
          pageInfos[this.book_uid] = {}
          this.$store.dispatch('getPageInfo', pageInfos)
        }

        this.$store.dispatch('setSinglePageInfo', { ...this.bookInfo })
        if (!this.bookInfo.need_pay) {
          pageInfos[this.book_uid][cid] = { ...this.bookInfo }
          this.$store.dispatch('getPageInfo', pageInfos)
        }
      }
      // this.finalOperate = this.bookInfo
      this.$nextTick(() => {
        this.bindTouch()
        handeler()
        this.pages = this.getPages(this.bookInfo.pageMin, this.touch.step)
        this.currentPage = this.getCurrentPages(
          this.bookInfo.pageScroll,
          this.touch.step
        )
        if (this.bookInfo.pageScroll) {
          this.touch.target[this.touch.property] = this.bookInfo.pageScroll
            ? this.bookInfo.pageScroll
            : 0
        }
        // if (this.bookInfo.need_pay) { //如果是付费章节，强行让滚动距离为0
        //     this.touch.target[this.touch.property] = 0
        // }
      })
    },
    //获取p标签offset数组
    getPoffset(pageScroll) {
      let ps = document.querySelectorAll('.read-content p')
      this.pArr = [].map.call(ps, item => {
        return item.getBoundingClientRect().left - 20 - pageScroll
      })
    },

    //获取当前页的pid
    handelCache() {
      let params = {}
      let pageScroll = this.bookInfo.pageScroll
      // let pArr = this.getPoffset(pageScroll)
      if (!this.pArr.length) {
        this.getPoffset(pageScroll)
      }
      for (var i = 0, l = this.pArr.length; i < l; i++) {
        if (this.pArr[i] == Math.abs(pageScroll)) {
          params = { cid: this.bookInfo.cid, pid: i, tid: 0 }
          break
        }
      }
      return params
    },
    //根据pid获取滚动距离
    getScrollByPid(pid) {
      let index = 0
      if (!this.pArr.length) {
        let pageScroll = this.bookInfo.pageScroll
        this.pArr = this.getPoffset(pageScroll)
      }
      return this.pArr[pid]
    },
     async buy() {
      let data = await createOrder({ bookId: this.book_uid, type: 0 });
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        location.href =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx156797003156a1d1&redirect_uri=" +
          encodeURIComponent(
            location.origin +
              location.pathname +
              "#payDetail/" +
              this.book_uid +
              "/" +
              data.orderid +
              "?redirect=" +
              this.$route.fullPath +
              "&location=" +
              location.href
          ) +
          "&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
      } else {
        this.$router.push({
          name: "payDetail",
          params: { bookId: this.book_uid, orderId: data.orderid },
          query: { redirect: this.$route.fullPath, location: location.href }
        });
      }
    },
    // async buy() {
    //   let data = await createOrder({ bookId: this.book_uid, type: 0 })
    //   this.$router.push({
    //     name: 'payDetail',
    //     params: { bookId: this.book_uid, orderId: data.orderid },
    //     query: { redirect: this.$route.fullPath, location: location.href }
    //   })
    // },
    login() {
      this.$router.push({
        name: 'login',
        query: { redirect: this.$route.fullPath }
      })
    },
    rightClick() {
      this.footbar = false // 隐藏底部栏
      this.topbar = false //隐藏头部栏
      this.$store.dispatch('cancelFoot') //取消激活菜单
      let pageScroll = this.bookInfo.pageScroll
      let step = this.touch.step
      let go = pageScroll - step
      if (
        go < this.touch.min &&
        this.bookInfo.cid < this.bookInfo.chapter_num - 1
      ) {
        this.loadNext()
      } else if (go < this.touch.min) {
        return
      } else {
        this.record(this.touch, go)
        this.touch.to(go)
      }
    },
    leftClick() {
      this.footbar = false // 隐藏底部栏
      this.topbar = false //隐藏头部栏
      this.$store.dispatch('cancelFoot') //取消激活菜单
      let pageScroll = this.bookInfo.pageScroll
      let step = this.touch.step
      let go = pageScroll + step
      if (go > this.touch.max && this.bookInfo.cid != 0) {
        this.loadPrev()
      } else if (go > this.touch.max) {
        return
      } else {
        this.record(this.touch, go)
        this.touch.to(go)
      }
    },
    record(touch, scroll) {
      this.currentRatios = scroll / touch.min //记录当前页占比
      this.bookInfo.pageScroll = scroll //记录当前页面滚动距离
      this.currentPage = this.getCurrentPages(scroll, touch.step) //获取当前页码
      this.$store.dispatch('setSinglePageInfo', this.bookInfo) //存储当前页
      if (!this.bookInfo.need_pay) {
        //储存整体信息当不用付钱时
        this.$store.state.pageInfos[this.book_uid][
          this.bookInfo.cid
        ] = this.bookInfo //储存当前页信息
        this.$store.dispatch('getPageInfo', this.$store.state.pageInfos)
      }
    },
    //缓存处理
    onCancel() {
      this.middleclick()
    },
    onConfirm() {
      let pageInfos = this.$store.state.pageInfos
      localStorage.removeItem('bookInfo')
      if (pageInfos[this.book_uid]) {
        delete pageInfos[this.book_uid]
      }
      this.$store.dispatch('getPageInfo', pageInfos)
      this.reset()
    },
    goUser() {
      this.$router.push({ name: 'user', params: { uid: this.account.uid } })
    }
  }
}
</script>
<style lang="less">
.read-container {
  overflow: hidden;
  height: 100%;
  padding: 0 20px 0.4rem;
  position: absolute;
  z-index: 10;
  width: 100%;
  background: #f8ead5;
  transition: all ease 300ms;
  .read-top-info {
    padding: 0.2rem 0 0.1rem;
    font-size: 16px;
    .title {
      width: auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
    }
  } // div{
  //     font-size: 30px;
  // }
  &.moon {
    background: #212121;
    div {
      color: #626262;
    }
  }
  p {
    text-indent: 2em;
    word-break: break-all;
    hyphens: auto;
    padding-bottom: 0.15rem;
  }
}

// .scroll-content{
//     columns: 320px;
//     column-gap: 40px;
//     height: 95%;
//     font-size: 18px;
//      overflow-x: scroll;
// }
.read-content {
  columns: 320px;
  column-gap: 40px;
  height: 95%;
  font-size: 18px; // overflow-x: scroll;
  text-align: justify;
  img {
    // break-inside: avoid;
    // -webkit-column-break-inside: avoid;
    max-width: 100%;
    display: block;
    margin: 0.2rem 0;
  }
  a {
    pointer-events: none;
  }
}

.middleclick {
  width: 2rem;
  height: 4rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 11;
}

.need-pay {
  text-align: center;
  .money-icon {
    width: 1.6rem;
    height: 1.6rem;
    border: 2px solid #eba943;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #eba943 !important;
    margin: 1.8rem auto 0.6rem;
    .zicon {
      font-size: 0.9rem;
    }
  }
  .book-title {
    font-size: 19px;
    font-weight: 700;
  }
  .ts-btn {
    width: 5.95rem;
    margin-top: 1rem;
    position: absolute;
    left: 0;
    right: 0;
    z-index: 20;
  }
  .pay-info {
    font-size: 16px;
  }
}

.navbar {
  .z-header {
    position: relative;
    min-height: 0.8rem;
    height: auto;
    .z-header-middle {
      width: 5rem;
    }
  }
  .z-header.vux-1px-b {
    position: relative;
  }
}

.rightClick,
.leftClick {
  position: absolute;
  width: 1rem;
  top: 0;
  bottom: 0;
  z-index: 20;
}

.rightClick {
  right: 0;
}

.leftClick {
  left: 0;
}

.read {
  .weui-dialog__btn_primary {
    color: #ffbf01;
  }
}
</style>


