<template>
  <div class="container">
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light navbar-expand">
      <div class="container">
        <a class="navbar-brand" href="#">考えるノート</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse"
                aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav mr-auto"/>
          <div class="navbar-nav">
            <button type="button"
                    class="btn btn-outline-secondary btn-sm mr-2"
                    v-b-modal.about-modal>使い方</button>
            <button type="button"
                    class="btn btn-outline-secondary btn-sm float-right"
                    v-on:click="onClickLogoutButton"
                    v-if="loggedIn">ログアウト</button>
            <div v-else>
              <button type="button"
                      class="btn btn-outline-secondary btn-sm mr-2"
                      v-on:click="onClickLoginButton(true)">登録</button>
              <button type="button"
                      class="btn btn-outline-secondary btn-sm float-right"
                      v-on:click="onClickLoginButton(false)">ログイン</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="row">
      <div class="col-3">
        <p class="h5 border-bottom p-3 mb-2">
          観察一覧
          <button type="button"
                  class="btn btn-outline-secondary btn-sm float-right"
                  v-on:click="onClickNoteCreateUpdateButton('', '', 1, '')"
                  v-bind:disabled="!loggedIn">＋</button>
        </p>
        <ul v-if="loggedIn">
          <li v-for="(rootNote, index) in rootNotes" :key="index">
            <p class="text-truncate mb-0">
              <button class="btn btn-link text-muted pl-0"
                      v-on:click="indexSelectedNotes(rootNote.id)">
                {{ rootNote.sentence }}
              </button>
            </p>
          </li>
        </ul>
      </div>
      <div class="col-9">
        <h5 class="border-bottom p-3">ノート</h5>
        <template v-if="loggedIn">
          <div v-for="(selectedNote) in selectedNotes" v-bind:key="selectedNote.id">
            <div class="card w-75 mb-2"
                 v-bind:class="{ 'offset-md-1': selectedNote.kind==2,
                                 'offset-md-2': selectedNote.kind==3,
                                 'offset-md-3': selectedNote.kind==4 }">
              <div class="card-body">
                <h6 class="card-subtitle mb-2" v-if="selectedNote.kind==1">観察</h6>
                <h6 class="card-subtitle mb-2" v-else-if="selectedNote.kind==2">仮説</h6>
                <h6 class="card-subtitle mb-2" v-else-if="selectedNote.kind==3">実験</h6>
                <h6 class="card-subtitle mb-2" v-else-if="selectedNote.kind==4">考察</h6>
                <p class="card-text" style="white-space: pre-wrap;">{{ selectedNote.sentence }}</p>
                <button class="btn btn-outline-secondary btn-sm"
                        v-if="selectedNotes.length==selectedNote.kind && selectedNote.kind!=4"
                        v-on:click="onClickNoteCreateUpdateButton('',
                                                                  selectedNote.root_note_id,
                                                                  selectedNote.kind + 1,
                                                                  '')">
                  考える
                </button>
                <button class="btn btn-outline-secondary btn-sm float-right ml-2"
                        v-on:click="onClickNoteDestroyButton(selectedNote.id,
                                                             selectedNote.kind)">削除</button>
                <button class="btn btn-outline-secondary btn-sm float-right"
                        v-on:click="onClickNoteCreateUpdateButton(selectedNote.id,
                                                                  selectedNote.root_note_id,
                                                                  selectedNote.kind,
                                                                  selectedNote.sentence)">
                  変更
                </button>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <p class="text-justify m-3">
            まだログインしていないようです。画面右上のログインボタンからログインしましょう。
          </p>
        </template>
      </div>
    </div>
    <b-modal ref="loginModal" id="login-modal" hide-header hide-footer>
      <b-form @submit="onSubmitLoginModal" class="w-100">
        <b-form-group id="form-username-group"
                      label="ユーザ名:"
                      label-for="form-username-input">
          <b-form-input id="form-username-input"
                        type="text"
                        v-model="loginForm.userName"
                        required
                        class="form-control-sm">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-password-group"
                      label="パスワード:"
                      label-for="form-password-input">
          <b-form-input id="form-password-input"
                        type="password"
                        v-model="loginForm.password"
                        required
                        autocomplete="off"
                        class="form-control-sm">
          </b-form-input>
        </b-form-group>
        <b-button type="submit"
                  variant="outline-secondary"
                  class="btn-sm mt-2">{{this.loginForm.register ? '登録' : 'ログイン' }}</b-button>
      </b-form>
    </b-modal>
    <b-modal ref="noteModal" id="note-modal" size="lg" hide-header hide-footer>
      <b-form @submit="onSubmitNoteModal">
        <b-form-group id="form-sentence-group">
          <div class="mb-2">
            {{ noteForm.title }}
          </div>
          <b-form-textarea id="form-sentence-input"
                           v-model="noteForm.sentence"
                           required
                           rows="10">
          </b-form-textarea>
        </b-form-group>
        <b-button type="submit"
                  variant="outline-secondary"
                  class="btn-sm mt-2">送信</b-button>
      </b-form>
    </b-modal>
    <b-modal ref="confirmModal" id="confirm-modal" size="sm" hide-header hide-footer>
      <div class="m-3">
        <p>
          後続のノートもまとめて削除されます。いいですか？
        </p>
        <b-button type="button"
                  variant="outline-secondary"
                  class="btn-sm mt-2"
                  @click="onSubmitConfirmModal">いいです</b-button>
        <b-button type="button"
                  variant="outline-secondary"
                  class="btn-sm mt-2 float-right"
                  @click="$bvModal.hide('confirm-modal')">やめておきます</b-button>
      </div>
    </b-modal>
    <b-modal ref="aboutModal" id="about-modal" size="lg" hide-header hide-footer>
      <div class="m-3">
        <p>
          考えるノートは、以前Eテレで放送されていた<strong>
            <a href="https://www.nhk.or.jp/rika/karasu/" class="text-dark" target="_blank">考えるカラス</a>
          </strong>という番組に影響を受け作られました。
        </p>
        <p>
          自ら課題を見つけ、観察し、仮説を立て、実験し、その結果をもとに考えるという<strong>科学の考え方</strong>をサポートできるような、メモ型のWebアプリケーションです。
        </p>
        <p>
          まだ何もノートを作っていないのであれば、画面左の＋ボタンからノートを作って観察結果をまとめてみましょう。
        </p>
        <b-button type="button"
                  variant="outline-secondary"
                  class="btn-sm mt-2"
                  @click="$bvModal.hide('about-modal')">わかりました</b-button>
      </div>
    </b-modal>
    <b-modal ref="noticeModal" id="notice-modal" hide-header hide-footer>
      <div class="m-3">
        <p>
          {{ this.noticeForm.message }}
        </p>
        <b-button type="button"
                  variant="outline-secondary"
                  class="btn-sm mt-2"
                  @click="$bvModal.hide('notice-modal')">わかりました</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loggedIn: false,
      accessToken: '',
      refreshToken: '',
      loginForm: {
        userName: '',
        password: '',
        register: false,
      },
      noteForm: {
        title: '',
        id: '',
        rootNoteId: '',
        kind: '',
        sentence: '',
      },
      confirmForm: {
        id: '',
        kind: '',
      },
      noticeForm: {
        message: '',
      },
      rootNotes: [],
      selectedNotes: [],
      axiosInterceptor: null,
    };
  },
  mounted() {
    document.title = '考えるノート';
    if (localStorage.accessToken) {
      this.accessToken = localStorage.accessToken;
    }
    if (localStorage.refreshToken) {
      this.refreshToken = localStorage.refreshToken;
    }
    this.enableInterceptor();
  },
  watch: {
    accessToken(value) {
      localStorage.accessToken = value;
    },
    refreshToken(value) {
      localStorage.refreshToken = value;
    },
    loggedIn(value) {
      if (value) {
        this.indexRootNotes();
      } else {
        this.rootNotes = [];
      }
      this.selectedNotes = [];
    },
  },
  computed: {
  },
  methods: {
    // 内部データの更新/モーダルの呼び出し
    onClickLoginButton(register) {
      this.loginForm.register = register;
      this.$bvModal.show('login-modal');
    },
    onClickLogoutButton() {
      this.initForm();
      this.loggedIn = false;
      this.accessToken = '';
      this.refreshToken = '';
    },
    onClickNoteCreateUpdateButton(id, rootNoteId, kind, sentence) {
      this.initForm();
      this.setNoteModalTitle(kind);
      this.noteForm.id = id;
      this.noteForm.rootNoteId = rootNoteId;
      this.noteForm.kind = kind;
      this.noteForm.sentence = sentence;
      this.$bvModal.show('note-modal');
    },
    onClickNoteDestroyButton(id, kind) {
      this.initForm();
      this.confirmForm.id = id;
      this.confirmForm.kind = kind;
      this.$bvModal.show('confirm-modal');
    },
    // フォーム情報の受け渡し
    onSubmitLoginModal(event) {
      event.preventDefault();
      this.$refs.loginModal.hide();
      const payload = {
        username: this.loginForm.userName,
        password: this.loginForm.password,
      };
      if (this.loginForm.register) {
        this.createUser(payload);
      } else {
        this.createAuthentication(payload);
      }
    },
    onSubmitNoteModal(event) {
      event.preventDefault();
      this.$refs.noteModal.hide();
      const payload = this.getNotePayload();
      if (typeof payload.id !== 'undefined') {
        this.updateNote(payload);
      } else {
        this.createNote(payload);
      }
    },
    onSubmitConfirmModal(event) {
      event.preventDefault();
      this.$refs.confirmModal.hide();
      this.destroyNote();
    },
    // APIへのリクエスト送信
    createAuthentication(payload) {
      const path = 'http://localhost:5000/auth/login';
      axios.post(path, payload)
        .then((response) => {
          this.loggedIn = true;
          this.accessToken = response.data.access_token;
          this.refreshToken = response.data.refresh_token;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
    refreshAuthentication() {
      return new Promise((resolve) => {
        const path = 'http://localhost:5000/auth/refresh';
        axios.post(path, '', {
          headers: {
            Authorization: `Bearer ${this.refreshToken}`,
          },
        })
          .then((response) => {
            this.accessToken = response.data.access_token;
            resolve(response.data.access_token);
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.log(error);
          });
      });
    },
    createUser(payload) {
      const path = 'http://localhost:5000/auth/register';
      axios.post(path, payload)
        .then((response) => {
          createAuthentication(payload);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
    indexRootNotes() {
      const path = 'http://localhost:5000/notes?kind=1';
      axios.get(path, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })
        .then((response) => {
          this.rootNotes = response.data.notes;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
    indexSelectedNotes(rootNoteId) {
      const path = 'http://localhost:5000/notes';
      axios.get(path, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
        params: {
          root: rootNoteId,
        },
      })
        .then((response) => {
          this.selectedNotes = response.data.notes;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
    createNote(payload) {
      const path = 'http://localhost:5000/notes';
      axios.post(path, payload, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })
        .then((response) => {
          this.sortRootNotes(payload, response);
          if (payload.kind === 1) {
            this.selectedNotes = [];
          }
          this.selectedNotes.push({
            id: response.data.id,
            root_note_id: payload.root_note_id || response.data.id,
            kind: payload.kind,
            sentence: payload.sentence,
          });
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
    updateNote(payload) {
      const path = 'http://localhost:5000/notes';
      axios.put(path, payload, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })
        .then((response) => {
          this.sortRootNotes(payload, response);
          const target = this.selectedNotes[payload.kind - 1];
          target.sentence = payload.sentence;
          this.selectedNotes.splice(payload.kind - 1, 1, target);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
    destroyNote() {
      const path = 'http://localhost:5000/notes';
      axios.delete(path, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
        data: { id: this.confirmForm.id },
      })
        .then(() => {
          this.selectedNotes.splice(
            this.confirmForm.kind - 1,
            this.selectedNotes.length - (this.confirmForm.kind - 1),
          );
          if (this.confirmForm.kind === 1) {
            const index = this.rootNotes.findIndex(note => note.id === this.confirmForm.id);
            this.rootNotes.splice(index, 1);
          }
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
    // エラー監視と再認証
    enableInterceptor() {
      // eslint-disable-next-line
      this.axiosInterceptor = axios.interceptors.response.use((response) => {
        return response;
      }, (error) => {
        if (error.response.status !== 401) {
          this.noticeForm.message = 'おや？何かがおかしいようです。'
                                  + 'ブラウザのJavaScriptコンソールを開いてエラー内容を確認し、'
                                  + 'このアプリケーションを作った人に教えてください。';
          this.$bvModal.show('notice-modal');
          return new Promise((resolve, reject) => {
            reject(error);
          });
        }

        if (error.config.url === '/auth/refresh' || !this.loggedIn) {
          this.noticeForm.message = 'ユーザ名/パスワードが誤っているか、認証トークンの有効期限が切れています。'
                                  + 'もう一度ログインしてみてください。';
          this.$bvModal.show('notice-modal');
          return new Promise((resolve, reject) => {
            reject(error);
          });
        }

        return this.refreshAuthentication()
          .then(() => {
            const config = error.config;
            config.headers['Authorization'] = `Bearer ${this.accessToken}`;

            return new Promise((resolve, reject) => {
              axios.request(config).then(response => {
                resolve(response);
              }).catch((error) => {
                reject(error);
              });
            });
          }).catch((error) => {
            return error;
          });
      });
    },
    // 内部メソッド
    setNoteModalTitle(kind) {
      switch (kind) {
        case 1:
          this.noteForm.title = '観察したことを記録する';
          break;
        case 2:
          this.noteForm.title = '仮説を立てる';
          break;
        case 3:
          this.noteForm.title = '実験結果をまとめる';
          break;
        case 4:
          this.noteForm.title = '実験の結果から考察する';
          break;
        default:
          break;
      }
    },
    getNotePayload() {
      let payload;
      if (this.noteForm.id !== '') {
        payload = {
          id: this.noteForm.id,
          root_note_id: this.noteForm.rootNoteId,
          kind: this.noteForm.kind,
          sentence: this.noteForm.sentence,
        };
      } else if (this.noteForm.rootNoteId !== '') {
        payload = {
          root_note_id: this.noteForm.rootNoteId,
          kind: this.noteForm.kind,
          sentence: this.noteForm.sentence,
        };
      } else {
        payload = {
          kind: this.noteForm.kind,
          sentence: this.noteForm.sentence,
        };
      }
      return payload;
    },
    sortRootNotes(payload, response) {
      if (typeof payload.root_note_id !== 'undefined') {
        const index = this.rootNotes.findIndex(note => note.id === payload.root_note_id);
        const target = this.rootNotes[index];
        this.rootNotes.splice(index, 1);
        this.rootNotes.unshift(target);
      } else {
        this.rootNotes.unshift({
          id: response.data.id,
          kind: payload.kind,
          sentence: payload.sentence,
        });
      }
    },
    initForm() {
      this.loginForm.userName = '';
      this.loginForm.password = '';
      this.loginForm.register = false;
      this.noteForm.title = '';
      this.noteForm.id = '';
      this.noteForm.rootNoteId = '';
      this.noteForm.kind = '';
      this.noteForm.sentence = '';
      this.confirmForm.id = '';
      this.confirmForm.kind = '';
      this.noticeForm.message = '';
    },
  },
};
</script>
