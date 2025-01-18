---
title: SQL子查询总结：相关子查询与非相关子查询有什么区别
categories:
  - 未分类
tags:
  - 无标签
date: 2016-11-26 10:31:27
---

<script setup lang="ts">
import PostHeader from '../../_components/PostHeader.vue'
import EditInfo from '../../_components/EditInfo.vue'
</script>


<PostHeader :postId='2600208412' />

> 如果一个select语句能够返回单个值或者一列值，且该select语句嵌套在另一个SQL语句（例如select语句、insert语句、update语句或者delete语句）中，那么该select语句成为“子查询”（也叫内层查询），包含子查询的SQL语句称为“主查询”（也叫外层查询）。为了标记子查询与主查询之间的关系，通常将子查询写在小括号内。子查询一般用在主查询的where子句或having子句中，与比较运算符或者逻辑运算符一起构成where筛选条件或having筛选条件。子查询分为“相关子查询”（Dependent Subquery）与“非相关子查询”。

## **非相关子查询**

如果子查询返回单个值，则可以讲一个表达式的值与子查询的结果进行比较。
例如，检索成绩比学生张三平均分高的所有学生及课程的信息， 可以使用下面的SQL语句， 执行结果如下图。
```SQL
mysql> select class_name, student.student_no, student_name, course_name, score
    -> from classes join student on student.class_no = classes.class_no
    -> join choose on choose.student_no = student.student_no
    -> join course on choose.course_no = course.course_no
    -> where score > (
    -> select avg(score)
    -> from student, choose
    -> where student.student_no = choose.student_no and student_name = '张三'
    -> );
```

![非相关子查询](https://github.com/user-attachments/assets/73ae1830-794e-4cc6-a7a3-d49b063a3e8d)

### **说明**

该示例中的子查询是一个单独的select语句，可以不依赖主查询单独运行。这种不依靠主查询，能够独立运行的子查询称为**“非相关子查询”**。

### **执行过程**

1. 执行子查询，其结果不被显示，而是传递给外部查询，作为外部查询的条件使用。
2. 执行外部查询，并显示整个结果。


## **相关子查询**

下面的示例演示了相关子查询，代码**第七行**标记了两条子查询语句之间的区别（其他SQl代码完全相同），执行结果如下图。
```SQL
mysql> select class_name, student.student_no, student_name, course_name, score
    -> from classes join student on student.class_no = classes.class_no
    -> join choose on choose.student_no = student.student_no
    -> join course on choose.course_no = course.course_no
    -> where score > (
    -> select avg(score)
    -> from choose
    -> where student.student_no = choose.student_no and student_name = '张三'
    -> );
```

![相关子查询](https://github.com/user-attachments/assets/b64e772d-36d1-4a4b-ab76-da20b90b4cda)

### **说明**

从执行结果可以看到，子查询可以仅仅使用自己定义的数据源，也可以“直接引用”主查询中的数据源，但两者意义完全不同。

1. 如果子查询中仅仅使用了自己定义的数据源， 这种查询是**非相关子查询**。 非相关子查询是独立于外部查询的子查询， 子查询总共执行一次， 执行完毕后将值传递给主查询。
2. 如果子查询中使用了主查询的数据源， 这种查询是**相关子查询**， 此时主查询的执行与相关子查询的执行**相互依赖**。

### **执行过程**

1. 从外层查询中取出一个元组，将元组相关列的值传递给内层查询。
2. 执行内层查询，得到子查询操作的值。
3. 外查询根据子查询返回的结果或结果集得到满足条件的行。
4. 然后外层查询取出下一个元组重复做步骤1-3，直到外层的元组全部处理完毕。


## **如何区分**

说了这么多，那我们该如何快速区分非相关子查询和相关子查询呢？

**最简单**的办法的就是直接看子查询本身能否执行。比如执行上面的例子中的子查询：

```SQL
mysql> select avg(score)
    -> from choose
    -> where student.student_no = choose.student_no and student_name = '张三';
```

![子查询](https://github.com/user-attachments/assets/44b67bcb-c0c0-4350-9d82-50aa97bc7515)

会报错：`1054 - Unknown column 'student.student_no' in 'where clause'`
这样的查询语句构成的子查询便为**相关子查询**。


<EditInfo editLink='https://github.com/liangpengyv/my-blog-by-fluxpress/issues/9' lastUpdated='2024-10-20 17:07:33' />