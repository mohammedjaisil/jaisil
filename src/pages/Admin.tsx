import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import {
  Mail, Check, Trash2, LogOut, PackageSearch, Settings,
  Plus, Upload, X, Tags, Menu, Edit2, Briefcase, HelpCircle, Quote, LayoutDashboard, TrendingUp, Star, User
} from 'lucide-react';

// ─── Interfaces ───────────────────────────────────────────────────────────────
interface Contact { id: string; name: string; email: string; phone?: string; message: string; status: string; created_at: string; }
interface Project { id: string; name: string; slug: string; category: string; created_at: string; description: string; full_description: string; tech: string[]; features: string[]; image: string; gallery: string[]; featured: boolean; sort_order: number; link: string; }
interface Category { id: string; name: string; slug: string; created_at: string; }
interface Service { id: string; title: string; description: string; features: string[]; image_url: string; sort_order: number; }
interface FAQItem { id: string; question: string; answer: string; sort_order: number; }
interface Testimonial { id: string; quote: string; name: string; role: string; image_url: string; sort_order: number; }
interface Skill { id: string; name: string; level: number; category: string; sort_order: number; }

type TabType = 'dashboard' | 'about' | 'skills' | 'contacts' | 'projects' | 'categories' | 'services' | 'faqs' | 'testimonials' | 'settings';

const Admin = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Data
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [aboutForm, setAboutForm] = useState({ title: '', subtitle: '', description_left: '', description_right: '' });
  const [isLoading, setIsLoading] = useState(true);

  // Form states – Project
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState({ name: '', slug: '', description: '', link: '', category: '', full_description: '', featured: false, sort_order: 0 });
  const [techInput, setTechInput] = useState('');
  const [featuresInput, setFeaturesInput] = useState('');
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string>('');
  const [existingMainImage, setExistingMainImage] = useState('');
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [existingGallery, setExistingGallery] = useState<string[]>([]);

  // Form states – Category
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [categoryForm, setCategoryForm] = useState({ name: '', slug: '' });

  // Form states – Service
  const [isAddingService, setIsAddingService] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState({ title: '', description: '', features: '', image_url: '', sort_order: 0 });

  // Form states – FAQ
  const [isAddingFaq, setIsAddingFaq] = useState(false);
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [faqForm, setFaqForm] = useState({ question: '', answer: '', sort_order: 0 });

  // Form states – Testimonial
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);
  const [testimonialForm, setTestimonialForm] = useState({ quote: '', name: '', role: '', image_url: '', sort_order: 0 });

  // Form states – Skill
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [skillForm, setSkillForm] = useState({ name: '', level: 80, category: 'Frontend', sort_order: 0 });

  // ─── Auth gate ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!loading && !user) navigate('/login');
    else if (user) { fetchAll(); }
  }, [user, loading]);

  // ─── Fetchers ────────────────────────────────────────────────────────────────
  const fetchAll = () => { fetchContacts(); fetchProjects(); fetchCategories(); fetchServices(); fetchFaqs(); fetchTestimonials(); fetchAbout(); fetchSkills(); };

  const fetchSkills = async () => {
    const { data } = await supabase.from('skills').select('*').order('sort_order', { ascending: true });
    setSkills(data || []);
  };

  const fetchAbout = async () => {
    const { data } = await supabase.from('about').select('*').single();
    if (data) setAboutForm({ title: data.title, subtitle: data.subtitle, description_left: data.description_left, description_right: data.description_right });
  };

  const fetchContacts = async () => {
    const { data } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
    setContacts(data || []);
    setIsLoading(false);
  };
  const fetchProjects = async () => {
    const { data } = await supabase.from('projects').select('*').order('sort_order', { ascending: true });
    setProjects(data || []);
  };
  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*').order('created_at', { ascending: false });
    setCategories(data || []);
  };
  const fetchServices = async () => {
    const { data } = await supabase.from('services').select('*').order('sort_order', { ascending: true });
    setServices(data || []);
  };
  const fetchFaqs = async () => {
    const { data } = await supabase.from('faqs').select('*').order('sort_order', { ascending: true });
    setFaqs(data || []);
  };
  const fetchTestimonials = async () => {
    const { data } = await supabase.from('testimonials').select('*').order('sort_order', { ascending: true });
    setTestimonials(data || []);
  };

  // ─── Shared helpers ──────────────────────────────────────────────────────────
  const uploadFile = async (file: File) => {
    const ext = file.name.split('.').pop();
    const path = `projects/${Math.random().toString(36).slice(2)}_${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('project-images').upload(path, file);
    if (error) throw error;
    return supabase.storage.from('project-images').getPublicUrl(path).data.publicUrl;
  };

  const go = (tab: TabType) => { setActiveTab(tab); setIsSidebarOpen(false); };
  const btn = (tab: TabType) => `w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === tab ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-foreground/80'}`;

  // ─── Project CRUD ────────────────────────────────────────────────────────────
  const handleCreateOrUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.category) { toast({ title: 'Select a category', variant: 'destructive' }); return; }
    if (!mainImageFile && !existingMainImage) { toast({ title: 'Main image required', variant: 'destructive' }); return; }
    setIsUploading(true);
    try {
      let img = existingMainImage;
      if (mainImageFile) img = await uploadFile(mainImageFile);
      let gallery = [...existingGallery];
      for (const f of galleryFiles) gallery.push(await uploadFile(f));
      const payload = { ...projectForm, image: img, gallery, tech: techInput.split(',').map(s => s.trim()).filter(Boolean), features: featuresInput.split(',').map(s => s.trim()).filter(Boolean) };
      if (editingProjectId) await supabase.from('projects').update(payload).eq('id', editingProjectId);
      else await supabase.from('projects').insert([payload]);
      toast({ title: editingProjectId ? 'Project updated' : 'Project created' });
      resetProjectForm(); fetchProjects();
    } catch (err: any) { toast({ title: 'Failed', description: err.message, variant: 'destructive' }); }
    finally { setIsUploading(false); }
  };

  const handleEditProject = (p: Project) => {
    setIsAddingProject(true); setEditingProjectId(p.id);
    setProjectForm({ 
      name: p.name, 
      slug: p.slug, 
      description: p.description, 
      link: p.link, 
      category: p.category, 
      full_description: p.full_description || '', 
      featured: p.featured || false, 
      sort_order: p.sort_order || 0 
    });
    setTechInput(p.tech?.join(', ') || ''); 
    setFeaturesInput(p.features?.join(', ') || '');
    setExistingMainImage(p.image); 
    
    // Ensure gallery is an array
    const galleryArr = Array.isArray(p.gallery) ? p.gallery : [];
    setExistingGallery(galleryArr);
    
    setMainImageFile(null); 
    setMainImagePreview(''); 
    setGalleryFiles([]); 
    setGalleryPreviews([]);
  };

  const resetProjectForm = () => {
    setIsAddingProject(false); setEditingProjectId(null);
    setProjectForm({ 
      name: '', 
      slug: '', 
      description: '', 
      link: '', 
      category: categories[0]?.name || '', 
      full_description: '', 
      featured: false, 
      sort_order: 0 
    });
    setTechInput(''); setFeaturesInput('');
    setMainImageFile(null); setMainImagePreview('');
    setGalleryFiles([]); 
    // Cleanup blob URLs
    galleryPreviews.forEach(URL.revokeObjectURL);
    setGalleryPreviews([]);
    setExistingMainImage(''); setExistingGallery([]);
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    await supabase.from('projects').delete().eq('id', id);
    setProjects(projects.filter(p => p.id !== id));
    toast({ title: 'Project deleted' });
  };

  // ─── Category CRUD ───────────────────────────────────────────────────────────
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategoryId) await supabase.from('categories').update(categoryForm).eq('id', editingCategoryId);
    else await supabase.from('categories').insert([categoryForm]);
    toast({ title: editingCategoryId ? 'Category updated' : 'Category created' });
    setCategoryForm({ name: '', slug: '' }); setIsAddingCategory(false); setEditingCategoryId(null); fetchCategories();
  };

  const deleteCategory = async (id: string) => {
    if (!confirm('Delete this category?')) return;
    await supabase.from('categories').delete().eq('id', id);
    setCategories(categories.filter(c => c.id !== id));
  };

  // ─── Service CRUD ────────────────────────────────────────────────────────────
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...serviceForm, features: serviceForm.features.split(',').map(s => s.trim()).filter(Boolean) };
    if (editingServiceId) await supabase.from('services').update(payload).eq('id', editingServiceId);
    else await supabase.from('services').insert([payload]);
    toast({ title: editingServiceId ? 'Service updated' : 'Service created' });
    setServiceForm({ title: '', description: '', features: '', image_url: '', sort_order: 0 }); setIsAddingService(false); setEditingServiceId(null); fetchServices();
  };

  const handleEditService = (s: Service) => {
    setIsAddingService(true); setEditingServiceId(s.id);
    setServiceForm({ title: s.title, description: s.description, features: s.features.join(', '), image_url: s.image_url || '', sort_order: s.sort_order });
  };

  const deleteService = async (id: string) => {
    if (!confirm('Delete this service?')) return;
    await supabase.from('services').delete().eq('id', id);
    setServices(services.filter(s => s.id !== id));
  };

  // ─── FAQ CRUD ────────────────────────────────────────────────────────────────
  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFaqId) await supabase.from('faqs').update(faqForm).eq('id', editingFaqId);
    else await supabase.from('faqs').insert([faqForm]);
    toast({ title: editingFaqId ? 'FAQ updated' : 'FAQ created' });
    setFaqForm({ question: '', answer: '', sort_order: 0 }); setIsAddingFaq(false); setEditingFaqId(null); fetchFaqs();
  };

  const handleEditFaq = (f: FAQItem) => {
    setIsAddingFaq(true); setEditingFaqId(f.id);
    setFaqForm({ question: f.question, answer: f.answer, sort_order: f.sort_order });
  };

  const deleteFaq = async (id: string) => {
    if (!confirm('Delete this FAQ?')) return;
    await supabase.from('faqs').delete().eq('id', id);
    setFaqs(faqs.filter(f => f.id !== id));
  };

  // ─── Testimonial CRUD ────────────────────────────────────────────────────────
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTestimonialId) await supabase.from('testimonials').update(testimonialForm).eq('id', editingTestimonialId);
    else await supabase.from('testimonials').insert([testimonialForm]);
    toast({ title: editingTestimonialId ? 'Testimonial updated' : 'Testimonial created' });
    setTestimonialForm({ quote: '', name: '', role: '', image_url: '', sort_order: 0 }); setIsAddingTestimonial(false); setEditingTestimonialId(null); fetchTestimonials();
  };

  const handleEditTestimonial = (t: Testimonial) => {
    setIsAddingTestimonial(true); setEditingTestimonialId(t.id);
    setTestimonialForm({ quote: t.quote, name: t.name, role: t.role, image_url: t.image_url || '', sort_order: t.sort_order });
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    await supabase.from('testimonials').delete().eq('id', id);
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  // ─── About CRUD ─────────────────────────────────────────────────────────────
  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: existing } = await supabase.from('about').select('id').single();
    if (existing) {
      await supabase.from('about').update(aboutForm).eq('id', existing.id);
    } else {
      await supabase.from('about').insert([aboutForm]);
    }
    toast({ title: 'About content updated' });
    fetchAbout();
  };

  // ─── Skill CRUD ─────────────────────────────────────────────────────────────
  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSkillId) await supabase.from('skills').update(skillForm).eq('id', editingSkillId);
    else await supabase.from('skills').insert([skillForm]);
    toast({ title: editingSkillId ? 'Skill updated' : 'Skill added' });
    setSkillForm({ name: '', level: 80, category: 'Frontend', sort_order: 0 }); setIsAddingSkill(false); setEditingSkillId(null); fetchSkills();
  };

  const deleteSkill = async (id: string) => {
    if (!confirm('Delete this skill?')) return;
    await supabase.from('skills').delete().eq('id', id);
    setSkills(skills.filter(s => s.id !== id));
  };

  // ─── Contact helpers ─────────────────────────────────────────────────────────
  const markAsRead = async (id: string) => {
    await supabase.from('contacts').update({ status: 'read' }).eq('id', id);
    setContacts(contacts.map(c => c.id === id ? { ...c, status: 'read' } : c));
  };
  const deleteContact = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    await supabase.from('contacts').delete().eq('id', id);
    setContacts(contacts.filter(c => c.id !== id));
  };
  const handleSignOut = async () => { await signOut(); navigate('/login'); };

  if (loading || isLoading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  if (!user) return null;

  const unread = contacts.filter(c => c.status === 'unread').length;

  // ─── Dashboard Stats ──────────────────────────────────────────────────────────
  const skillProgress = [
    { name: 'React.js / Frontend', level: 90, color: 'hsl(var(--primary))' },
    { name: 'PHP / Backend', level: 85, color: 'hsl(var(--primary)/0.8)' },
    { name: 'TypeScript', level: 82, color: 'hsl(var(--primary)/0.7)' },
    { name: 'UI/UX & Design', level: 72, color: 'hsl(var(--primary)/0.6)' },
    { name: 'Database (SQL)', level: 80, color: 'hsl(var(--primary)/0.5)' },
    { name: 'DevOps / Deployment', level: 60, color: 'hsl(var(--primary)/0.4)' },
  ];

  const workProgress = [
    { label: 'Client Projects', value: projects.filter(p => p.category !== 'Personal').length, max: 20, color: 'bg-blue-500' },
    { label: 'Personal Projects', value: projects.filter(p => p.category === 'Personal').length, max: 10, color: 'bg-violet-500' },
    { label: 'Services Offered', value: services.length, max: 8, color: 'bg-emerald-500' },
    { label: 'Testimonials', value: testimonials.length, max: 20, color: 'bg-amber-500' },
  ];

  const StatCard = ({ label, value, sub, icon: Icon, color }: { label: string; value: number | string; sub?: string; icon: React.ElementType; color: string }) => (
    <div className={`bg-card border rounded-2xl p-6 flex items-start gap-4 hover:shadow-md transition-all`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm font-medium mt-0.5">{label}</p>
        {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
      </div>
    </div>
  );

  const ProgressBar = ({ label, level, color }: { label: string; level: number; color: string }) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground font-mono">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-border overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${level}%`, background: color }}
        />
      </div>
    </div>
  );

  // ─── Reusable row action buttons ────────────────────────────────────────────
  const RowActions = ({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) => (
    <td className="px-6 py-4 text-right whitespace-nowrap">
      <Button size="sm" variant="ghost" onClick={onEdit}><Edit2 className="w-4 h-4" /></Button>
      <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10 ml-2" onClick={onDelete}><Trash2 className="w-4 h-4" /></Button>
    </td>
  );

  // ─── Generic form wrapper ────────────────────────────────────────────────────
  const FormCard = ({ children, onSubmit, title }: { children: React.ReactNode; onSubmit: (e: React.FormEvent) => void; title: string }) => (
    <div className="bg-card border rounded-xl p-6 md:p-8 mb-8 shadow-sm">
      <h3 className="font-semibold mb-6 text-xl">{title}</h3>
      <form onSubmit={onSubmit} className="space-y-6">{children}</form>
    </div>
  );

  const Input = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <input className="w-full bg-background border px-4 py-2.5 rounded-lg" {...props} />
    </div>
  );

  const Textarea = ({ label, ...props }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <textarea className="w-full bg-background border px-4 py-2.5 rounded-lg resize-y" rows={4} {...props} />
    </div>
  );

  // ─── Empty table row ─────────────────────────────────────────────────────────
  const EmptyRow = ({ message }: { message: string }) => (
    <div className="text-center py-16 text-muted-foreground">{message}</div>
  );

  // ═══════════════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">

      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-card">
        <span className="font-bold text-lg">Admin Panel</span>
        <Button variant="ghost" size="sm" onClick={() => setIsSidebarOpen(!isSidebarOpen)}><Menu className="w-5 h-5" /></Button>
      </div>

      {/* Sidebar */}
      <aside className={`w-64 border-r bg-card flex-shrink-0 flex-col z-50 transition-all
        ${isSidebarOpen ? 'fixed inset-y-0 left-0 shadow-2xl flex' : 'hidden'}
        md:sticky md:top-0 md:h-screen md:flex`}
      >
        <div className="p-6 border-b hidden md:flex items-center">
          <h2 className="text-xl font-bold tracking-tight">Admin<span className="text-primary">.</span></h2>
        </div>
        {isSidebarOpen && (
          <div className="p-4 border-b md:hidden flex justify-end">
            <Button variant="ghost" size="sm" onClick={() => setIsSidebarOpen(false)}><X className="w-4 h-4" /></Button>
          </div>
        )}

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <button onClick={() => go('dashboard')} className={btn('dashboard')}><LayoutDashboard className="w-4 h-4" /> Dashboard</button>
          <button onClick={() => go('about')} className={btn('about')}><User className="w-4 h-4" /> About Section</button>
          <button onClick={() => go('skills')} className={btn('skills')}><TrendingUp className="w-4 h-4" /> Skills Section</button>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground px-4 pb-2 pt-3">Content</p>
          <button onClick={() => go('contacts')} className={btn('contacts')}>
            <Mail className="w-4 h-4" /> Contacts
            {unread > 0 && <span className="ml-auto bg-destructive text-destructive-foreground text-[10px] px-2 py-0.5 rounded-full">{unread}</span>}
          </button>
          <button onClick={() => go('projects')} className={btn('projects')}><PackageSearch className="w-4 h-4" /> Projects</button>
          <button onClick={() => go('services')} className={btn('services')}><Briefcase className="w-4 h-4" /> Services</button>
          <button onClick={() => go('faqs')} className={btn('faqs')}><HelpCircle className="w-4 h-4" /> FAQs</button>
          <button onClick={() => go('testimonials')} className={btn('testimonials')}><Quote className="w-4 h-4" /> Testimonials</button>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground px-4 pb-2 pt-3">Config</p>
          <button onClick={() => go('categories')} className={btn('categories')}><Tags className="w-4 h-4" /> Categories</button>
          <button onClick={() => go('settings')} className={btn('settings')}><Settings className="w-4 h-4" /> Settings</button>
        </nav>

        <div className="p-4 border-t">
          <Button variant="outline" className="w-full gap-2 text-destructive border-destructive/20 hover:bg-destructive/10" onClick={handleSignOut}>
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">

        {/* ══ DASHBOARD ════════════════════════════════════════════════════ */}
        {activeTab === 'dashboard' && (
          <div className="animate-in fade-in zoom-in-95 duration-200 space-y-8">
            <div>
              <h2 className="text-2xl font-semibold">Dashboard</h2>
              <p className="text-muted-foreground text-sm mt-1">Overview of your portfolio, skills, and work progress.</p>
            </div>

            {/* ─ Quick stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Total Projects" value={projects.length} sub={`${projects.filter(p => p.featured).length} featured`} icon={PackageSearch} color="bg-blue-500/10 text-blue-500" />
              <StatCard label="Unread Messages" value={unread} sub={`${contacts.length} total`} icon={Mail} color="bg-rose-500/10 text-rose-500" />
              <StatCard label="Services" value={services.length} sub="active offerings" icon={Briefcase} color="bg-emerald-500/10 text-emerald-500" />
              <StatCard label="Testimonials" value={testimonials.length} sub="client reviews" icon={Star} color="bg-amber-500/10 text-amber-500" />
            </div>

            {/* ─ Skills + Work panels */}
            <div className="grid md:grid-cols-2 gap-6">

              {/* Knowledge progress */}
              <div className="bg-card border rounded-2xl p-6 space-y-5">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Knowledge Progress</h3>
                </div>
                {skillProgress.map(s => (
                  <ProgressBar key={s.name} label={s.name} level={s.level} color={s.color} />
                ))}
              </div>

              {/* Work breakdown */}
              <div className="bg-card border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <PackageSearch className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Work Breakdown</h3>
                </div>
                <div className="space-y-5">
                  {workProgress.map(w => (
                    <div key={w.label}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">{w.label}</span>
                        <span className="text-muted-foreground">{w.value} / {w.max}</span>
                      </div>
                      <div className="h-3 rounded-full bg-border overflow-hidden">
                        <div
                          className={`h-full rounded-full ${w.color} transition-all duration-700`}
                          style={{ width: `${Math.min((w.value / w.max) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {categories.length > 0 && (
                  <div className="mt-8">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Projects by Category</p>
                    <div className="space-y-1">
                      {categories.map(cat => {
                        const count = projects.filter(p => p.category === cat.name).length;
                        return count > 0 ? (
                          <div key={cat.id} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                            <span className="text-sm">{cat.name}</span>
                            <span className="text-xs bg-secondary px-2 py-1 rounded-md font-mono">{count}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ─ Recent inquiries */}
            {contacts.length > 0 && (
              <div className="bg-card border rounded-2xl p-6">
                <h3 className="font-semibold mb-4">Recent Inquiries</h3>
                <div className="space-y-1">
                  {contacts.slice(0, 5).map(c => (
                    <div key={c.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                          {c.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{c.name}</p>
                          <p className="text-xs text-muted-foreground">{c.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground hidden sm:block">{format(new Date(c.created_at), 'MMM d')}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${c.status === 'unread' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{c.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {contacts.length > 5 && (
                  <button onClick={() => go('contacts')} className="mt-4 text-xs text-primary hover:underline">
                    View all {contacts.length} messages →
                  </button>
                )}
              </div>
            )}

            {/* ─ Project pipeline */}
            {projects.length > 0 && (
              <div className="bg-card border rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Projects Pipeline</h3>
                  <button onClick={() => go('projects')} className="text-xs text-primary hover:underline">Manage all →</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {projects.slice(0, 6).map(p => (
                    <div key={p.id} className="flex items-start gap-3 p-3 rounded-xl border hover:bg-muted/30 transition-colors">
                      {p.image && <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />}
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{p.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{p.category}</p>
                        {p.featured && <span className="text-[10px] text-primary font-semibold">★ Featured</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══ ABOUT ═══════════════════════════════════════════════════ */}
        {activeTab === 'about' && (
          <div className="animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-semibold mb-6">About Section Content</h2>
            <FormCard title="Edit Bio & About Story" onSubmit={handleSaveAbout}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Main Tagline" value={aboutForm.title} onChange={e => setAboutForm({ ...aboutForm, title: e.target.value })} placeholder="I combine years of expertise..." />
                <Input label="Section Subtitle" value={aboutForm.subtitle} onChange={e => setAboutForm({ ...aboutForm, subtitle: e.target.value })} placeholder="(ABOUT)" />
              </div>
              <Textarea label="Bio (Left Side)" value={aboutForm.description_left} onChange={e => setAboutForm({ ...aboutForm, description_left: e.target.value })} placeholder="I'm Mohammed Jaisil..." />
              <Textarea label="Bio (Right Side)" value={aboutForm.description_right} onChange={e => setAboutForm({ ...aboutForm, description_right: e.target.value })} placeholder="I specialize in..." />
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="submit">Update About Section</Button>
              </div>
            </FormCard>
          </div>
        )}

        {/* ══ SKILLS ═══════════════════════════════════════════════════ */}
        {activeTab === 'skills' && (
          <div className="animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Manage Skills</h2>
              <Button onClick={() => { setIsAddingSkill(!isAddingSkill); setEditingSkillId(null); setSkillForm({ name: '', level: 80, category: 'Frontend', sort_order: 0 }); }} className="gap-2">
                {isAddingSkill ? <><X className="w-4 h-4" />Cancel</> : <><Plus className="w-4 h-4" />Add Skill</>}
              </Button>
            </div>

            {isAddingSkill && (
              <FormCard title={editingSkillId ? 'Edit Skill' : 'New Skill'} onSubmit={handleSaveSkill}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Input label="Skill Name" required value={skillForm.name} onChange={e => setSkillForm({ ...skillForm, name: e.target.value })} placeholder="E.g. React.js" />
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <select className="w-full bg-background border px-4 py-2 rounded-lg" value={skillForm.category} onChange={e => setSkillForm({ ...skillForm, category: e.target.value })}>
                      <option value="Frontend">Frontend (Circular Rings)</option>
                      <option value="Backend">Backend (Horizontal Bars)</option>
                      <option value="Tools">Tools (Horizontal Bars)</option>
                      <option value="Ticker">Ticker (Scrolling Strip Only)</option>
                    </select>
                  </div>
                  <Input label="Progress (0-100)" type="number" required value={skillForm.level} onChange={e => setSkillForm({ ...skillForm, level: +e.target.value })} />
                  <Input label="Sort Order" type="number" value={skillForm.sort_order} onChange={e => setSkillForm({ ...skillForm, sort_order: +e.target.value })} />
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button type="button" variant="ghost" onClick={() => setIsAddingSkill(false)}>Cancel</Button>
                  <Button type="submit">{editingSkillId ? 'Save Changes' : 'Add Skill'}</Button>
                </div>
              </FormCard>
            )}

            <div className="bg-card rounded-xl border overflow-hidden">
              {skills.length === 0 ? <EmptyRow message="No skills yet." /> : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/30 border-b text-xs uppercase text-muted-foreground">
                      <tr>
                        <th className="px-6 py-4 text-left">Pos</th>
                        <th className="px-6 py-4 text-left">Name</th>
                        <th className="px-6 py-4 text-left">Category</th>
                        <th className="px-6 py-4 text-left">Progress</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {skills.map(s => (
                        <tr key={s.id} className="hover:bg-muted/20">
                          <td className="px-6 py-4 font-mono">{s.sort_order}</td>
                          <td className="px-6 py-4 font-medium">{s.name}</td>
                          <td className="px-6 py-4 truncate"><span className="bg-secondary px-2 py-0.5 rounded text-[10px]">{s.category}</span></td>
                          <td className="px-6 py-4">
                            <div className="w-full bg-muted rounded-full h-1.5 max-w-[100px]">
                              <div className="bg-primary h-1.5 rounded-full" style={{ width: `${s.level}%` }}></div>
                            </div>
                          </td>
                          <RowActions onEdit={() => { setIsAddingSkill(true); setEditingSkillId(s.id); setSkillForm({ name: s.name, level: s.level, category: s.category, sort_order: s.sort_order }); }} onDelete={() => deleteSkill(s.id)} />
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── CONTACTS ─────────────────────────────────────────────────────── */}
        {activeTab === 'contacts' && (
          <div className="animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-semibold mb-6">Contact Messages</h2>
            {contacts.length === 0
              ? <div className="text-center py-16 text-muted-foreground bg-card rounded-xl border border-dashed">No messages found.</div>
              : contacts.map(c => (
                <div key={c.id} className={`bg-card p-6 rounded-xl border mb-4 transition-all ${c.status === 'unread' ? 'border-2 border-primary shadow-sm' : 'opacity-80'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{c.name}</h3>
                      <a href={`mailto:${c.email}`} className="text-primary text-sm hover:underline">{c.email}</a>
                      {c.phone && <p className="text-sm font-mono mt-0.5 text-muted-foreground">{c.phone}</p>}
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground block mb-3">{format(new Date(c.created_at), 'PPP')}</span>
                      <div className="flex gap-2 justify-end">
                        {c.status === 'unread' && <Button size="sm" variant="outline" onClick={() => markAsRead(c.id)}><Check className="w-4 h-4 mr-1" /> Read</Button>}
                        <Button size="sm" variant="destructive" onClick={() => deleteContact(c.id)}><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg text-sm whitespace-pre-wrap">{c.message}</div>
                </div>
              ))}
          </div>
        )}

        {/* ── PROJECTS ──────────────────────────────────────────────────────── */}
        {activeTab === 'projects' && (
          <div className="animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Manage Projects</h2>
              <Button onClick={() => { setIsAddingProject(!isAddingProject); if (isAddingProject) resetProjectForm(); }} className="gap-2">
                {isAddingProject ? <><X className="w-4 h-4" />Cancel</> : <><Plus className="w-4 h-4" />Add Project</>}
              </Button>
            </div>

            {isAddingProject && (
              <FormCard title={editingProjectId ? 'Edit Project' : 'New Project'} onSubmit={handleCreateOrUpdateProject}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Project Name" required value={projectForm.name} onChange={e => setProjectForm({ ...projectForm, name: e.target.value })} placeholder="VroxHub Studio" />
                  <Input label="Slug (URL)" required value={projectForm.slug} onChange={e => setProjectForm({ ...projectForm, slug: e.target.value })} placeholder="vroxhub" />
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <select className="w-full bg-background border px-4 py-2.5 rounded-lg" value={projectForm.category} onChange={e => setProjectForm({ ...projectForm, category: e.target.value })}>
                      {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                    {categories.length === 0 && <p className="text-xs text-destructive">Add categories first.</p>}
                  </div>
                  <Input label="Live URL" required value={projectForm.link} onChange={e => setProjectForm({ ...projectForm, link: e.target.value })} placeholder="https://..." />
                  <Input label="Sort Order" type="number" value={projectForm.sort_order} onChange={e => setProjectForm({ ...projectForm, sort_order: +e.target.value })} />
                  <div className="flex items-center gap-3 mt-5">
                    <input type="checkbox" id="feat" checked={projectForm.featured} onChange={e => setProjectForm({ ...projectForm, featured: e.target.checked })} className="w-5 h-5 accent-primary" />
                    <label htmlFor="feat" className="text-sm font-medium cursor-pointer">Featured on Home Page</label>
                  </div>
                </div>

                <Input label="Short Description" required value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} placeholder="Brief summary…" />
                <Textarea label="Full Description" required value={projectForm.full_description} onChange={e => setProjectForm({ ...projectForm, full_description: e.target.value })} placeholder="Detailed description…" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Technologies (comma separated)" value={techInput} onChange={e => setTechInput(e.target.value)} placeholder="React, Node, Tailwind" />
                  <Input label="Features (comma separated)" value={featuresInput} onChange={e => setFeaturesInput(e.target.value)} placeholder="Dark Mode, Analytics" />
                </div>

                <div className="p-6 border rounded-xl bg-muted/10 space-y-6">
                  <h4 className="font-semibold text-sm uppercase tracking-wide text-foreground/70">Images</h4>

                  {/* ── Main Cover ── */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Main Cover Image <span className="text-destructive">*</span></label>

                    {/* Preview thumbnail */}
                    {(mainImagePreview || existingMainImage) && (
                      <div className="relative inline-block">
                        <img
                          src={mainImagePreview || existingMainImage}
                          alt="Main cover preview"
                          className="h-44 w-auto max-w-xs rounded-xl object-cover border-2 border-primary/30 shadow-md"
                        />
                        <button
                          type="button"
                          onClick={() => { setMainImageFile(null); setMainImagePreview(''); setExistingMainImage(''); }}
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-white flex items-center justify-center hover:bg-destructive/80 shadow"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <span className="absolute bottom-2 left-2 text-[10px] bg-black/60 text-white px-2 py-0.5 rounded-md">
                          {mainImagePreview ? 'New – pending upload' : 'Current image'}
                        </span>
                      </div>
                    )}

                    <div className={`border-2 border-dashed rounded-xl p-5 text-center relative transition-colors ${mainImagePreview || existingMainImage ? 'border-primary/40' : 'hover:bg-muted/50 border-border'}`}>
                      <input
                        type="file" accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setMainImageFile(file);
                            setMainImagePreview(URL.createObjectURL(file));
                            setExistingMainImage('');
                          }
                        }}
                      />
                      <Upload className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {mainImagePreview || existingMainImage ? 'Click to replace image' : 'Click to choose a cover image'}
                      </span>
                    </div>
                  </div>

                  {/* ── Gallery ── */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Gallery Images <span className="text-muted-foreground text-xs">(optional)</span></label>

                    {/* Show existing items if they exist */}
                    {existingGallery.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Saved Images ({existingGallery.length})</p>
                        <div className="flex flex-wrap gap-2 pb-2">
                          {existingGallery.map((url, i) => (
                            <div key={`exist-${i}`} className="relative group w-20 h-20">
                              <img src={url} alt="" className="w-full h-full object-cover rounded-lg border border-border shadow-sm" />
                              <button
                                type="button"
                                onClick={() => setExistingGallery(prev => prev.filter((_, idx) => idx !== i))}
                                className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Show pending uploads */}
                    {galleryPreviews.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-[10px] uppercase tracking-widest text-primary font-bold">New Images Pending ({galleryPreviews.length})</p>
                        <div className="flex flex-wrap gap-2 pb-2">
                          {galleryPreviews.map((url, i) => (
                            <div key={`new-${i}`} className="relative group w-20 h-20">
                              <img src={url} alt="" className="w-full h-full object-cover rounded-lg border-2 border-primary/40 shadow-sm" />
                              <button
                                type="button"
                                onClick={() => {
                                  const fileToRevoke = galleryPreviews[i];
                                  setGalleryFiles(prev => prev.filter((_, idx) => idx !== i));
                                  setGalleryPreviews(prev => prev.filter((_, idx) => idx !== i));
                                  URL.revokeObjectURL(fileToRevoke);
                                }}
                                className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className={`border-2 border-dashed rounded-xl p-8 text-center relative transition-all duration-200 ${galleryPreviews.length > 0 || existingGallery.length > 0 ? 'border-primary/20 bg-primary/5' : 'border-border hover:border-primary/40 hover:bg-muted/30'}`}>
                      <input
                        type="file" multiple accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        title=""
                        onChange={e => {
                          const files = e.target.files;
                          if (!files?.length) return;
                          const newFiles = Array.from(files);
                          const newPreviews = newFiles.map(f => URL.createObjectURL(f));
                          setGalleryFiles(prev => [...prev, ...newFiles]);
                          setGalleryPreviews(prev => [...prev, ...newPreviews]);
                          e.target.value = '';
                        }}
                      />
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-background border flex items-center justify-center shadow-sm">
                          <Plus className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold">Drop images here or click to upload</p>
                          <p className="text-[10px] text-muted-foreground mt-1">Supports multiple files</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button type="button" variant="ghost" onClick={resetProjectForm}>Cancel</Button>
                  <Button type="submit" disabled={isUploading}>{isUploading ? 'Saving…' : editingProjectId ? 'Save Changes' : 'Publish'}</Button>
                </div>
              </FormCard>
            )}

            <div className="bg-card rounded-xl border overflow-hidden">
              {projects.length === 0 ? <EmptyRow message="No projects yet." /> : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/30 border-b text-xs uppercase text-muted-foreground">
                      <tr>
                        <th className="px-6 py-4 text-left">Pos</th>
                        <th className="px-6 py-4 text-left">Name</th>
                        <th className="px-6 py-4 text-left">Category</th>
                        <th className="px-6 py-4 text-left">Featured</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {projects.map(p => (
                        <tr key={p.id} className="hover:bg-muted/20">
                          <td className="px-6 py-4 font-mono">{p.sort_order}</td>
                          <td className="px-6 py-4 font-medium">{p.name}</td>
                          <td className="px-6 py-4"><span className="bg-secondary text-secondary-foreground px-2.5 py-1 rounded-md text-xs">{p.category}</span></td>
                          <td className="px-6 py-4">{p.featured ? <span className="text-primary font-bold text-xs">YES</span> : <span className="text-muted-foreground text-xs">No</span>}</td>
                          <RowActions onEdit={() => handleEditProject(p)} onDelete={() => deleteProject(p.id)} />
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── SERVICES ──────────────────────────────────────────────────────── */}
        {activeTab === 'services' && (
          <div className="animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Manage Services</h2>
              <Button onClick={() => { setIsAddingService(!isAddingService); setEditingServiceId(null); setServiceForm({ title: '', description: '', features: '', image_url: '', sort_order: 0 }); }} className="gap-2">
                {isAddingService ? <><X className="w-4 h-4" />Cancel</> : <><Plus className="w-4 h-4" />Add Service</>}
              </Button>
            </div>

            {isAddingService && (
              <FormCard title={editingServiceId ? 'Edit Service' : 'New Service'} onSubmit={handleSaveService}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Service Title" required value={serviceForm.title} onChange={e => setServiceForm({ ...serviceForm, title: e.target.value })} placeholder="Web Design & Development" />
                  <Input label="Sort Order / Position" type="number" value={serviceForm.sort_order} onChange={e => setServiceForm({ ...serviceForm, sort_order: +e.target.value })} />
                </div>
                <Textarea label="Description" required value={serviceForm.description} onChange={e => setServiceForm({ ...serviceForm, description: e.target.value })} placeholder="What this service covers…" />
                <Input label="Features (comma separated)" value={serviceForm.features} onChange={e => setServiceForm({ ...serviceForm, features: e.target.value })} placeholder="Responsive Design, CMS Integration, SEO" />
                <Input label="Image URL (optional)" value={serviceForm.image_url} onChange={e => setServiceForm({ ...serviceForm, image_url: e.target.value })} placeholder="https://images.unsplash.com/…" />
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button type="button" variant="ghost" onClick={() => setIsAddingService(false)}>Cancel</Button>
                  <Button type="submit">{editingServiceId ? 'Save Changes' : 'Create Service'}</Button>
                </div>
              </FormCard>
            )}

            <div className="bg-card rounded-xl border overflow-hidden">
              {services.length === 0 ? <EmptyRow message="No services yet." /> : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/30 border-b text-xs uppercase text-muted-foreground">
                      <tr>
                        <th className="px-6 py-4 text-left">Pos</th>
                        <th className="px-6 py-4 text-left">Title</th>
                        <th className="px-6 py-4 text-left">Features</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {services.map(s => (
                        <tr key={s.id} className="hover:bg-muted/20">
                          <td className="px-6 py-4 font-mono">{s.sort_order}</td>
                          <td className="px-6 py-4 font-medium">{s.title}</td>
                          <td className="px-6 py-4 text-muted-foreground text-xs">{s.features?.join(', ')}</td>
                          <RowActions onEdit={() => handleEditService(s)} onDelete={() => deleteService(s.id)} />
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── FAQs ──────────────────────────────────────────────────────────── */}
        {activeTab === 'faqs' && (
          <div className="animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Manage FAQs</h2>
              <Button onClick={() => { setIsAddingFaq(!isAddingFaq); setEditingFaqId(null); setFaqForm({ question: '', answer: '', sort_order: 0 }); }} className="gap-2">
                {isAddingFaq ? <><X className="w-4 h-4" />Cancel</> : <><Plus className="w-4 h-4" />Add FAQ</>}
              </Button>
            </div>

            {isAddingFaq && (
              <FormCard title={editingFaqId ? 'Edit FAQ' : 'New FAQ'} onSubmit={handleSaveFaq}>
                <Input label="Sort Order / Position" type="number" value={faqForm.sort_order} onChange={e => setFaqForm({ ...faqForm, sort_order: +e.target.value })} />
                <Input label="Question" required value={faqForm.question} onChange={e => setFaqForm({ ...faqForm, question: e.target.value })} placeholder="What's your typical process?" />
                <Textarea label="Answer" required value={faqForm.answer} onChange={e => setFaqForm({ ...faqForm, answer: e.target.value })} placeholder="Detailed answer…" />
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button type="button" variant="ghost" onClick={() => setIsAddingFaq(false)}>Cancel</Button>
                  <Button type="submit">{editingFaqId ? 'Save Changes' : 'Create FAQ'}</Button>
                </div>
              </FormCard>
            )}

            <div className="bg-card rounded-xl border overflow-hidden">
              {faqs.length === 0 ? <EmptyRow message="No FAQs yet." /> : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/30 border-b text-xs uppercase text-muted-foreground">
                      <tr>
                        <th className="px-6 py-4 text-left">Pos</th>
                        <th className="px-6 py-4 text-left">Question</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {faqs.map(f => (
                        <tr key={f.id} className="hover:bg-muted/20">
                          <td className="px-6 py-4 font-mono">{f.sort_order}</td>
                          <td className="px-6 py-4 font-medium max-w-xs">{f.question}</td>
                          <RowActions onEdit={() => handleEditFaq(f)} onDelete={() => deleteFaq(f.id)} />
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
        {activeTab === 'testimonials' && (
          <div className="animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Manage Testimonials</h2>
              <Button onClick={() => { setIsAddingTestimonial(!isAddingTestimonial); setEditingTestimonialId(null); setTestimonialForm({ quote: '', name: '', role: '', image_url: '', sort_order: 0 }); }} className="gap-2">
                {isAddingTestimonial ? <><X className="w-4 h-4" />Cancel</> : <><Plus className="w-4 h-4" />Add Testimonial</>}
              </Button>
            </div>

            {isAddingTestimonial && (
              <FormCard title={editingTestimonialId ? 'Edit Testimonial' : 'New Testimonial'} onSubmit={handleSaveTestimonial}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Input label="Client Name" required value={testimonialForm.name} onChange={e => setTestimonialForm({ ...testimonialForm, name: e.target.value })} placeholder="Ahmed Hassan" />
                  <Input label="Role / Company" required value={testimonialForm.role} onChange={e => setTestimonialForm({ ...testimonialForm, role: e.target.value })} placeholder="CEO of TechStartup" />
                  <Input label="Sort Order" type="number" value={testimonialForm.sort_order} onChange={e => setTestimonialForm({ ...testimonialForm, sort_order: +e.target.value })} />
                </div>
                <Textarea label="Quote / Review" required value={testimonialForm.quote} onChange={e => setTestimonialForm({ ...testimonialForm, quote: e.target.value })} placeholder="Our website now looks and performs better than ever…" />
                <Input label="Photo URL (optional)" value={testimonialForm.image_url} onChange={e => setTestimonialForm({ ...testimonialForm, image_url: e.target.value })} placeholder="https://…" />
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button type="button" variant="ghost" onClick={() => setIsAddingTestimonial(false)}>Cancel</Button>
                  <Button type="submit">{editingTestimonialId ? 'Save Changes' : 'Add Testimonial'}</Button>
                </div>
              </FormCard>
            )}

            <div className="bg-card rounded-xl border overflow-hidden">
              {testimonials.length === 0 ? <EmptyRow message="No testimonials yet." /> : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/30 border-b text-xs uppercase text-muted-foreground">
                      <tr>
                        <th className="px-6 py-4 text-left">Pos</th>
                        <th className="px-6 py-4 text-left">Name</th>
                        <th className="px-6 py-4 text-left">Role</th>
                        <th className="px-6 py-4 text-left">Quote</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {testimonials.map(t => (
                        <tr key={t.id} className="hover:bg-muted/20">
                          <td className="px-6 py-4 font-mono">{t.sort_order}</td>
                          <td className="px-6 py-4 font-medium whitespace-nowrap">{t.name}</td>
                          <td className="px-6 py-4 text-muted-foreground text-xs whitespace-nowrap">{t.role}</td>
                          <td className="px-6 py-4 text-muted-foreground text-xs max-w-xs truncate">"{t.quote}"</td>
                          <RowActions onEdit={() => handleEditTestimonial(t)} onDelete={() => deleteTestimonial(t.id)} />
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── CATEGORIES ────────────────────────────────────────────────────── */}
        {activeTab === 'categories' && (
          <div className="animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Manage Categories</h2>
              <Button onClick={() => { setIsAddingCategory(!isAddingCategory); setCategoryForm({ name: '', slug: '' }); setEditingCategoryId(null); }} className="gap-2" variant={isAddingCategory ? 'outline' : 'default'}>
                {isAddingCategory ? <><X className="w-4 h-4" />Cancel</> : <><Plus className="w-4 h-4" />Add Category</>}
              </Button>
            </div>

            {isAddingCategory && (
              <div className="bg-card border rounded-xl p-6 mb-8 shadow-sm">
                <form onSubmit={handleSaveCategory} className="flex flex-col md:flex-row gap-4 items-end">
                  <div className="space-y-2 flex-1">
                    <label className="text-sm font-medium">Display Name</label>
                    <input required className="w-full bg-background border px-4 py-2 rounded-lg" value={categoryForm.name}
                      onChange={e => setCategoryForm({ name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })} placeholder="E.g. Full Stack App" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <label className="text-sm font-medium">Slug</label>
                    <input required className="w-full bg-background border px-4 py-2 rounded-lg bg-muted/50" value={categoryForm.slug}
                      onChange={e => setCategoryForm({ ...categoryForm, slug: e.target.value })} placeholder="full-stack-app" />
                  </div>
                  <Button type="submit" className="h-[42px] w-full md:w-auto">{editingCategoryId ? 'Update' : 'Save'}</Button>
                </form>
              </div>
            )}

            <div className="bg-card rounded-xl border overflow-hidden">
              {categories.length === 0 ? <EmptyRow message="No categories yet." /> : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/30 border-b text-xs uppercase text-muted-foreground">
                      <tr>
                        <th className="px-6 py-4 text-left">Name</th>
                        <th className="px-6 py-4 text-left">Slug</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {categories.map(c => (
                        <tr key={c.id} className="hover:bg-muted/20">
                          <td className="px-6 py-4 font-medium">{c.name}</td>
                          <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{c.slug}</td>
                          <RowActions onEdit={() => { setIsAddingCategory(true); setEditingCategoryId(c.id); setCategoryForm({ name: c.name, slug: c.slug }); }} onDelete={() => deleteCategory(c.id)} />
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── SETTINGS ──────────────────────────────────────────────────────── */}
        {activeTab === 'settings' && (
          <div className="animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-semibold mb-6">Site Configuration</h2>
            <div className="max-w-3xl bg-card rounded-xl border shadow-sm p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Main Email</label>
                <input className="w-full bg-background border px-4 py-2.5 rounded-lg" defaultValue="jaisilmohammed@gmail.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Phone Number</label>
                <input className="w-full bg-background border px-4 py-2.5 rounded-lg" defaultValue="+971 50 992 1123" />
              </div>
              <div className="pt-4 border-t">
                <Button disabled>Save Settings (Coming Soon)</Button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Admin;
