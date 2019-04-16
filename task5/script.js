class PostList {

    constructor(posts) {
        var _posts = posts;
        this.setPosts = function (postsToSet) { _posts = postsToSet; };
        this.getPosts = () => _posts;
    }

    getPage( skip = 0, top = 10, filterConfig ) {
        let posts = this.getPosts();
        posts.sort;

        if (typeof skip !== 'number' || typeof top !== 'number') {
            return[];
        }

        if (typeof filterConfig === 'object') {
            posts = posts.filter(function (post) {

                if (filterConfig.hasOwnProperty('createdAt')) {
                    return Date.parse(post.createdAt) === Date.parse(filterConfig.createdAt);
                }

                if (filterConfig.hasOwnProperty('author')) {
                    if (filterConfig.author !== post.author)
                        return false;
                }

                if (filterConfig.hasOwnProperty('tags')) {
                    if (!filterConfig.tags.every(function (tag) {
                        return post.tags.includes(tag);
                    }))
                        return false;
                }
                return true;
            });
        }
        return posts.slice(skip, top + skip);
    }

    get(id) {
        var flag = false;
        for (var i = 0; i < photoPosts.length; i++) {
            if (photoPosts[i].id === id) {
                flag = true;
                return photoPosts[i];
            }
        }
        if (!flag) {
            console.log("No such ID");
            return flag;
        }
    }

    validate(post) {
        if (typeof post !== 'object') {
            return false;
        }
        if (typeof post.id !== 'string' || post.id === '')
            return false;
        if (typeof post.description !== 'string')
            return false;
        if (!(post.createdAt instanceof Date))
            return false;
        if (typeof post.author !== 'string' || post.author === '')
            return false;
        if (typeof post.photoLink !== 'string' || post.photoLink === '')
            return false;
        if (typeof post.tags === 'undefined' || !Array.isArray(post.tags))
            return false;
        if (typeof post.likes === 'undefined' || !Array.isArray(post.likes))
            return false;

        return true;
    }

    add(photoPost) {
        if (!this.validate(photoPost)) { return false; }
        const newPostCollection = this.getPosts();
        newPostCollection.push(photoPost);
        this.setPosts(newPostCollection);
        return true;

    }

    sort (somePost) {
        somePost.sort(function (a, b) {
            if (a.createdAt - b.createdAt < 0) {
                return 1;
            } else {
                return -1;
            }
        });
    }

    edit (id, photoPost) {
        if (typeof id !== 'string' || id === '' || typeof photoPost !== 'object') {
            return false;
        }
        var post = this.get(id);
        if (post) {

            if (photoPost.hasOwnProperty('description')) {
                post.description = photoPost.description;
            }
            if (photoPost.hasOwnProperty('photoLink')) {
                post.photoLink = photoPost.photoLink;
            }
            if (photoPost.hasOwnProperty('tags')) {
                post.hashTags = photoPost.tags;
            }
            if (photoPost.hasOwnProperty('likes')) {
                post.likes = photoPost.likes;
            }
            return true;
        }
        return false;
    }

    remove (id) {
        if (typeof id !== 'string' || id === '') {
            return false;
        }
        var posts = this;
        for (var i = 0; i < posts.length; ++i) {
            if (posts[i].id === id) {
                posts.splice(i, 1);
                return true;
            }
        }

        return false;
    }

    addAll(posts) {
        var notAdded = [];
        for (var index = 0; index < posts.length; index++) {
            if (!this.add(posts[index])) { notAdded.push(posts[index]); }
        }
        return notAdded;
    }
}

const photoPosts = [
    {
        id: '1',
        description: 'Pумба среди всех бальных танцев характеризуется наиболее глубоким эмоциональным содержанием. \n' +
            '            Также, в ходе своего усовершенствования, этот танец приобрел многие черты, свойственные блюзу. \n' +
            '            Неповторимый эстетический эффект танца создает ярко выраженный эмоциональный характер и довольно драматическое содержание музыки. \n' +
            '            Румба, по праву, занимает место одного из самых ярких танцев любви. ',
        createdAt: new Date('2019-03-04T01:59:00'),
        author: 'Elizaveta Sheshko',
        photoLink: 'images/im.jpg',
        tags: ['Румба', 'Куба','Бальные  танцы'],
        likes: ['Шешко Дарья','Хлебович Александра']
    },

    {
        id: '2',
        description: 'Хип-хоп танец  относится к уличным танцевальным стилям, в основном сопровождаемый \n' +
            '            хип-хоп музыкой и той, которая развивалась как часть хип-хоп культуры. Он включает в себя широкий диапазон стилей, ',
        createdAt: new Date('2019-03-02T10:00:00'),
        author: 'Aleksandr Levoneny',
        photoLink: 'images/im2.jp',
        tags: ['Хип-хоп', 'США'],
        likes: ['User1']
    },

    {
        id: '3',
        description: 'Особое место в танцевальном мире занимает танец живота.\n' +
            '            Это древнейшее искусство, благодаря которому женщина выражает свои чувства и желания. \n' +
            '            Каждое движение магнитом притягивает взгляды зрителей, вызывая восхищение и очарование.\n' +
            '            Занятия бэллидэнсом доступны дамам любого телосложения и возраста.\n' +
            '            В отличие от фитнеса или аэробики, здесь невозможно травмировать колени, ступни или голени. \n' +
            '            Осваивать восточную пластику можно даже при наличии лишних килограммов или плохой физподготовки.',
        createdAt: new Date('2019-03-02T9:59:00'),
        author: 'Sheshko Dasha',
        photoLink: 'images/im3.jpg',
        tags: ['Восточные танцы','Индия'],
        likes: ['Elizaveta Sheshko','User3']
    },

    {
        id: '4',
        description: 'Лезгинка — это общее название для всех быстрых кавказских танцев, \n' +
            '            которые в культуре разных народов называются по-разному. Лезгинку исполняют под музыку с ритмом в 6/8.\n' +
            '            Ее принято танцевать во время праздников — календарных, свадеб, дней рождения — и на сцене.\n' +
            '            Историки и хореографы сходятся во мнении, что точно установить, какой кавказский народ придумал лезгинку, невозможно.',
        createdAt: new Date('2019-03-02T8:00:00'),
        author: 'Kutbi Kirom',
        photoLink: 'images/im5.jpg',
        tags: ['Лезгинка','Кавказ'],
        likes: ['User5','Shehsko Dash','Ismoil']
    },

    {
        id: '5',
        description: 'Балет - вид сценического искусства; спектакль, содержание \n' +
            '            которого воплощается в музыкально-хореографических образах. В основе классического балетного спектакля \n' +
            '            лежит определённый сюжет, драматургический замысел, либретто, в XX веке появился бессюжетный балет, \n' +
            '            драматургия которого основана на развитии, заложенном в музыке.',
        createdAt: new Date('2019-02-28T15:35:00'),
        author: 'Balet Teacher',
        photoLink: 'images/im6.jpg',
        tags: ['Балет', 'Классика'],
        likes: ['Kutbi Kirom','user1']
    },

    {
        id: '6',
        description: 'Ирландский танец - целая группа традиционных танцевальных форм, возникших в Ирландии, - \n' +
            '            подразделяется на бытовые (общественные, социальные) танцы и концертные танцы\n' +
            '            (театральные танцы или постановочные танцы, как принято называть в Великобритании). \n' +
            '            Общественные или бытовые ирландские танцы – кейли и сет-танцы. Постановочные танцы традиционно называют сольными танцами.',
        createdAt: new Date('2019-02-26T01:12:00'),
        author: 'Natallia',
        photoLink: 'images/im7.jpg',
        tags: ['Ирландия'],
        likes: ['Balet Teacher','user1']
    },

    {
        id: '7',
        description: 'Этот танцевально-музыкальный стиль появился в самой страстной стране в мире – Испании. \n' +
            '            Он включает в себя более полусотни разновидностей, каждая из которых имеет свои неповторимые черты и особенности. \n' +
            '            Чаще всего, песни и танцы фламенко сопровождаются гитарой или же перкуссией: игрой на перкуссионном ящике, \n' +
            '            ритмичным хлопаньем в ладоши, и иногда кастаньетами. У каждого исполнителя фламенко есть свое собственное обозначение,\n' +
            '            к примеру, певцов называют «кантаоры», танцоров «байлаоры», а гитаристов «токаоры».',
        createdAt: new Date('2019-02-23T10:10:00'),
        author: 'Elizaveta Sheshko',
        photoLink: 'images/im8.jpg"',
        tags: ['ИСпания','Фламенко'],
        likes: ['user1','photographer']
    },

    {
        id: '8',
        description: 'Евреи испокон веков танцевали, чтобы выразить свою радость, скорбь и любые другие эмоции, \n' +
            '            применимые к конкретному времени и событию. Некоторые из этих танцев дожили и до сегодняшних дней, например,\n' +
            '            на свадьбах часто исполняется традиционный танец в сопровождении известной клезмерской музыки.\n' +
            '            Еврейские танцы формировались и развивались на протяжении многих веков, сочетая традиции как самих евреев, так и традиции \n' +
            '            язычников, с которыми они жили рядом. Тем не менее, свой собственный стиль и некоторые традиции — к примеру, правило,\n' +
            '            что нельзя танцевать вместе с противоположным полом на официальных мероприятиях.',
        createdAt: new Date('2019-03-02T20:36:00'),
        author: 'Girshin',
        photoLink: 'images/im9.jp',
        tags: ['Еврейский танец'],
        likes: ['Elizavets Sheshko','user1','photographer']
    },

    {
        id: '9',
        description: 'Брейк-данс  — оригинальный жанр, из-за которого появился Хип-хоп.\n' +
            '            Сегодня выделяют два основных вида этого танца: нижний брейк-данс — танцор исполняет в основном акробатические, \n' +
            '            силовые трюки; верхний брейк-данс — базируется на пластике тела: это перемещения тела в пространстве и фиксы,\n' +
            '            которые на первый взгляд противоречат всем законам физики и гравитации. Весь танец брейкинг пришёл из Нью-Йорка . \n' +
            '            Брейкданс зарождался в конце 60-х годов, но принято считать, что как отдельный танец он сформировался к 1973 году.',
        createdAt: new Date('2019-02-21T15:24:00'),
        author: 'Alex',
        photoLink: 'images/im10.jpg',
        tags: ['Hip-hop'],
        likes: ['photographer']
    },

    {
        id:'10',
        description: 'Чечётка— разновидность танца, характерной особенностью которой является ритмическая ударная работа ног. \n' +
            '            Как правило, чечётка исполняется в специальной обуви, подбитой металлическими пластинами.Чечётка происходит из смешения различных культур,\n' +
            '            прежде всего ирландского танца и афроамериканских танцевальных традиций.',
        createAt: new Date('2019-02-5T:15:24:00'),
        author:'Username',
        photoLink: 'images/im11.jpg',
        tags:['Чечетка','США','Ираландия'],
        likes:['Alex']
    }
];



    const model = new PostList(photoPosts);

    console.log('getPage');
    console.log('invalid args: ',model.getPage('arg1','arg2'));
    console.log('skip = 3, default top: ', model.getPage(3));
    console.log('skip = 4, top = 4: ', model.getPage(4, 4));
    console.log('filter by author=\'Elizaveta Sheshko\': ', model.getPage(0,3,{author:'Elizaveta Sheshko'}));
    console.log('\n');
    console.log('get');
    console.log('invalid argument: ', model.get(''));
    console.log('id=100 (invalid): ', model.get('100'));
    console.log('id = 3: ', model.get('3'));
    console.log('\n');
    console.log('validate');
    console.log('valid post: ', model.validate({
        id: '10',
        description: 'descript',
        createdAt: new Date('2019-02-23T23:00:00'),
        author: 'auth',
        photoLink: 'images/img1.jpg',
        tags: ['tag1'],
        likes: ['likeuser']
    }));
    console.log('invalid post: ', model.validate({
        id: '10',
        description: 'descript',
        createdAt: new Date('2019-02-23T23:00:00'),
        author: 'auth',
        photoLink: null,
        tags: ['tag1'],
        likes: ['likeuser']
    }));
    console.log('\n');
    console.log('add');
    console.log('valid post: ', model.add({
        id: '21',
        description: 'Танго',
        createdAt: new Date('2022-03-05T01:46:00'),
        author: 'person',
        photoLink: 'images/img1.jpg',
        tags: ['hello'],
        likes: []
    }));

    console.log('all posts after adding:', model.getPosts());
    console.log('\n')
    console.log('edit');
    console.log('post with id=\'1\': ', model.get('1'));
    console.log('edit post with id=\'1\': ', model.edit('1', {
        description: 'edited description'
    }));
    console.log('edited post with id=\'1\': ', model.get('1'));
    console.log('trying to edit with invalid args: ', model.edit('', 1));
    console.log('\n');
    console.log('remove');
    console.log('remove post with id=\'5\': ', model.remove('5'));
    console.log('get post with id=\'5\':',model.get('5'));
    console.log('all posts after removing post:', model.getPosts());



