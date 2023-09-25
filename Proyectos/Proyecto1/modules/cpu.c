#include <linux/module.h> // THIS_MODULE, MODULE_VERSION, ...
#include <linux/init.h>   // module_{init,exit}
#include <linux/proc_fs.h>
#include <linux/sched/signal.h> // for_each_process()
#include <linux/seq_file.h>
#include <linux/fs.h>
#include <linux/sched.h>
#include <linux/mm.h> // get_mm_rss()
#include <linux/tick.h>
#include <linux/jiffies.h>
#include <linux/kernel.h>

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Modulo de RAM, Laboratorio Sistemas Operativos 1, 202000560");
MODULE_AUTHOR("Marjorie Gissell Reyes Franco");


struct task_struct *task;       // sched.h para tareas/procesos
struct task_struct *task_child; // index de tareas secundarias
struct list_head *list;         // lista de cada tareas




static int escribir_archivo(struct seq_file *file_proc, void *v){

    
    unsigned long total_ram_pages;
    unsigned long rss;
  
    uint64_t total_cpu_time_ns;
    uint64_t total_usage_ns;
    unsigned long cpu_porcentaje;

    int porcentaje;
    
    total_ram_pages = totalram_pages();
    
    if (!total_ram_pages) {
        pr_err("No memory available\n");
        return -EINVAL;
    }
    
    #ifndef CONFIG_MMU
        pr_err("No MMU, cannot calculate RSS.\n");
        return -EINVAL;
    #endif
    
    total_cpu_time_ns = 0;
    total_usage_ns = 0;
    cpu_porcentaje=0;

    for_each_process(task) {
    uint64_t cpu_time_ns;
    cpu_time_ns = task->utime + task->stime;
    total_usage_ns += cpu_time_ns;
    }

    total_cpu_time_ns = ktime_to_ns(ktime_get());

    if (total_cpu_time_ns > 0) {
        cpu_porcentaje = (total_usage_ns * 100) / total_cpu_time_ns;
    } else {
        cpu_porcentaje = 0;
    }

    seq_printf(file_proc, "{\"cpu\":%ld,\n", cpu_porcentaje);
    seq_printf(file_proc, "\"procesos\": {\n");
    for_each_process(task) {
        
        if (task->mm){
            rss = get_mm_rss(task->mm);
        } else {
            rss = 0;
        }

        seq_printf(file_proc, "{ \"pid\":%d,\n", task->pid);
        seq_printf(file_proc, "\"nombre_p\":\"%s\",\n", task->comm);
        seq_printf(file_proc, "\"usuario_p\": %u,\n", task->cred->uid.val);
        seq_printf(file_proc, "\"estado_p\":%u,\n", task->__state);
        porcentaje = (rss * 100) / total_ram_pages;
        seq_printf(file_proc, "\"ram_p\":%d\n", porcentaje);
        seq_printf(file_proc, "},\n");
    }
    seq_printf(file_proc, "}\n");
    seq_printf(file_proc, "}\n");
    return 0;
    
}

static int al_abrir(struct inode *inode, struct file *file)
{
    return single_open(file, escribir_archivo, NULL);
}

static struct proc_ops operaciones =
{
    .proc_open = al_abrir,
    .proc_read = seq_read
};

static int _insert(void)
{
    proc_create("cpu_202000560", 0, NULL, &operaciones);
    printk(KERN_INFO "Se creó el modulo CPU\n");
    return 0;
}

static void _remove(void)
{
    remove_proc_entry("cpu_202000560", NULL);
    printk(KERN_INFO "Se borró el modulo CPU\n");
}

module_init(_insert);
module_exit(_remove);
