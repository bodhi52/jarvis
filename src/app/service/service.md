# angular 中service的作用
常见的后端开发中，有个MVC开发模式：Model-View-Controller。在MVC架构中，有个service层，负责是连接Controller和Model。Controller处理用户的输入和请求，Service负责从Model中获取数据并处理数据，Model定义数据库的字段定义和一些行为。

但是在Angular中，Service的作用和MVC中Service的作用相差甚远。

说起Angular，不得不说下MVVM设计模式：Model-View-ViewModel，Model数据层，它是与引用程序的业务逻辑相关的数据的封装载体，View视图，专注于界面的显示和渲染。ViewModel视图-数据，它是View和Model的联合体，负责View和Model的交互和写作。MVVM利用框架内置的双向绑定技术引入了ViewModel来实现View和Model的粘合。
## angular架构
angular的基本构造块是NgModule，它为组件提供了编译的上下文环境。angular应用就是由一组NgModule定义的，应用至少会有一个用于引导应用的根模块。angular应用都至少有一个组件，也就是根组件，它把组件树和页面中的DOM连接起来。组件定义视图，组件使用服务，组件和服务都是简单的累，这些类使用装饰器来标出他们的类型，并提供元数据以告知angular该如何使用它们。
## angular中的服务
对于与特定视图无关并希望跨足间共享的数据或逻辑，可以创建服务类。服务类的定义通常使用装饰器`@Injectable`。该装饰器提供的元数据可以让你的服务作为依赖被注入到客户组件中去。

angular吧组件和服务分开，以提高模块性和复用性。通常情况下，组件的工作只管用户体验，而不用顾及其他。组件不应该做一些服务器获取数据、验证用户输入等工作，而应该将这些任务委托给各种服务。通过把各种处理任务定义到可注入的服务类中，你可以让他可以被任何组件使用。通过依赖注入，可以让这些服务用于各个组件中。
## 提供服务
对于用到的任何服务，必须至少注册一个提供商`provider`。服务可以注册自己的提供商，这样可以让自己到处可用，或者也可以为特定的模块或组件注册提提供商。要注册提供商，就要在服务的`@Injectable`装饰器中提供它的元数据，或者在`@NgModule`或`@Component`的元数据中。

默认情况下，使用angular Cli时使用脚手架生成的服务会在`@Injectable`装饰器中提供元数据，把它注册到跟注入器中：
``` js
@Injectable({
    providedIn: 'root',
}
```
这样子的话，